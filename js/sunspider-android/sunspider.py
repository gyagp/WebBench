# This is ported from WebKit/PerformanceTests/SunSpider/sunspider, which is a perl script
# Before test, please copy d8 to /data/local/tmp/v8/d8

import os
import time
import argparse
import re
import subprocess
import sys

run_instruments = False
suite = ''
js_shell_path = ''
js_shell_args = ''
set_baseline = False
tests_pattern = ''
test_runs = 0
results_file = ''
result_directory = ''
time_string = ''
suite_path = ''
prefix_file = ''
android_need_push = True
target_os = ''

tests = []
categories = []

dir_android_tmp = '/data/local/tmp'
dir_android_sunspider = dir_android_tmp + '/SunSpider'
path_android_d8 = dir_android_tmp + '/v8/d8'


def parse_arg():
    global args, args_dict
    parser = argparse.ArgumentParser(description='Script about sunspider',
                                     formatter_class=argparse.RawTextHelpFormatter,
                                     epilog='''
examples:
  python %(prog)s --shell=/workspace/project/v8/v8/out-x86/Release/d8 --args=--expose_gc
  python %(prog)s --target-os android --args=--expose_gc
''')
    parser.add_argument('--target-os', dest='target_os', help='target os', default='android')
    parser.add_argument('--args', dest='js_shell_args', help='Arguments to pass to JavaScript shell')
    parser.add_argument('--runs', dest='test_runs', type=int, help='Number of times to run tests (default: test_runs)', default=10)
    parser.add_argument('--shell', dest='js_shell_path', help='Path to JavaScript shell')
    parser.add_argument('--set-baseline', dest='set_baseline', help='Set baseline for future comparisons', action='store_true')
    parser.add_argument('--tests', dest='tests_pattern', help='Only run tests matching provided pattern')
    parser.add_argument('--instruments', dest='run_instruments', help='Sample execution time with the Mac OS X "Instruments" tool (Time Profile) (implies --runs=1)', action='store_true')
    parser.add_argument('--output', dest='results_file', help='Override the default output path and filename')

    parser.add_argument('--suite', dest='suite', help='Select a specific benchmark suite. The default is sunspider-1.0.2', default='sunspider-1.0.2')
    parser.add_argument('--ubench', dest='ubench', help='Use microbenchmark suite instead of regular tests. Same as --suite=ubench', action='store_true')
    parser.add_argument('--v8-suite', dest='v8_suite', help='Use the V8 benchmark suite. Same as --suite=v8-v4', action='store_true')
    parser.add_argument('--parse-only', dest='parse_only', help='Use the parse-only benchmark suite. Same as --suite=parse-only', action='store_true')

    args = parser.parse_args()
    args_dict = vars(args)

    if len(sys.argv) <= 1:
        parser.print_help()
        quit()


def get_symbolic_link_dir():
    if sys.argv[0][0] == '/':  # Absolute path
        script_path = sys.argv[0]
    else:
        script_path = os.getcwd() + '/' + sys.argv[0]
    return os.path.split(script_path)[0]


def setup():
    global suite, result_directory, test_runs, tests_pattern, time_string, results_file, js_shell_path, tests_pattern, suite_path, prefix_file, js_shell_args, target_os, run_instruments, set_baseline

    run_instruments = args.run_instruments
    tests_pattern = args.tests_pattern
    js_shell_path = args.js_shell_path
    tests_pattern = args.tests_pattern
    js_shell_args = args.js_shell_args
    target_os = args.target_os
    test_runs = args.test_runs
    set_baseline = args.set_baseline

    if os.path.islink(sys.argv[0]):
        dir_root = get_symbolic_link_dir()
    else:
        dir_root = os.path.abspath(os.getcwd())
    os.chdir(dir_root)

    if args.ubench:
        suite = 'ubench'
    elif args.v8_suite:
        suite = 'v8-v4'
    elif args.parse_only:
        suite = 'parse-only'
    else:
        suite = args.suite

    result_directory = suite + '-results'

    suite_path = suite
    if not re.match('\/', suite):
        suite_path = 'tests/' + suite_path

    if run_instruments:
        test_runs = 1

    if target_os == 'linux' and not args.js_shell_path:
        print 'Please designate JavaScript shell'
        exit(1)

    time_string = time.strftime('%Y-%m-%d-%H.%M.%S', time.localtime())

    prefix_file = '%s/sunspider-test-prefix.js' % result_directory
    if args.results_file:
        results_file = args.results_file
    else:
        results_file = '%s/sunspider-results-%s.js' % (result_directory, time_string)


def dump_to_file(contents, path):
    f = open(path, 'w')
    f.write(contents)
    f.close()


def load_tests_list():
    global categories, tests

    print suite_path
    f = open(suite_path + '/LIST')
    lines = f.readlines()
    f.close()
    for line in lines:
        if tests_pattern and not re.search(tests_pattern, line):
            continue

        line_strip = line.strip('\n')
        tests.append(line_strip)
        category = line_strip.split('-')[0]
        if category not in categories:
            categories.append(category)


def write_prefix_file():
    prefix = 'var suitePath = ' + '"' + suite_path + '"' + ';\n'
    prefix += 'var tests = [ ' + ', '.join(['"' + x + '"' for x in tests]) + ' ];\n'
    prefix += 'var categories = [ ' + ', '.join(['"' + x + '"' for x in categories]) + ' ];\n'

    prefix += '''
function run(file) {
    var startTime = new Date;
    try {
        load(file);
        time = new Date() - startTime;
    } catch (e) {
        time = 0 / 0;
    }
    return time;
}
'''
    if not os.path.exists(result_directory):
        os.makedirs(result_directory)
    dump_to_file(prefix, prefix_file)


def run_tests_once(use_instruments):
    global android_need_push

    if target_os == 'android' and android_need_push:
        android_need_push = False
        os.system('adb push resources %s/resources' % dir_android_sunspider)
        os.system('adb push %s %s/tests/%s' % (suite_path, dir_android_sunspider, suite))
        os.system('adb push %s-results %s/%s-results' % (suite, dir_android_sunspider, suite))

    shell_args = js_shell_args + ' -f %s -f resources/sunspider-standalone-driver.js 2> /dev/null' % prefix_file

    if target_os == 'android':
        cmd = 'adb shell "cd %s && %s %s | grep -v break"' % (dir_android_sunspider, path_android_d8, shell_args)
    else:
        if use_instruments:
            cmd = 'instruments -t "resources/TimeProfile20us.tracetemplate" %s %s' % (js_shell_path, shell_args)
        else:
            cmd = '%s %s | grep -v break' % (js_shell_path, shell_args)
    proc = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    output = proc.stdout.read()

    return output


def newest_file(dir, pattern):
    newest_age = ''
    newest_file = ''
    for file in os.listdir(dir):
        if re.search(pattern, file):
            age = os.path.getmtime('%s/%s' % (dir, file))
            if not newest_age or age < newest_age:
                newest_file = file
                newest_age = age

    return '%s/%s' % (dir, newest_file)


if __name__ == '__main__':
    parse_arg()
    setup()
    load_tests_list()
    if tests_pattern:
        print 'Found ' + str(len(tests)) + ' tests matching "' + tests_pattern + '"'
    else:
        print 'Found ' + str(len(tests)) + ' tests'

    if not len(tests):
        print 'No tests to run'
        exit(0)

    tmp = 'Running SunSpider once for warmup, then '
    if run_instruments:
        tmp += 'under Instruments'
    else:
        tmp += '%s time' % test_runs
    if test_runs == 1:
        tmp += ''
    else:
        tmp += 's'
    print tmp

    write_prefix_file()

    run_tests_once(False)
    print 'Discarded first run.'

    result = 0
    count = 0
    results = []
    total = 0
    print '['
    while count < test_runs:
        result = run_tests_once(run_instruments)
        result = result.replace('\r\n', '\n')
        result.strip('\n')
        results.append(result)
        print result
        if count != test_runs:
            print ','
        count += 1
    print ']'

    output = 'var output = [\n' + ',\n'.join(results) + '\n];\n'
    dump_to_file(output, results_file)
    if target_os == 'android':
        os.system('adb push %s %s/%s' % (results_file, dir_android_sunspider, results_file))
    if set_baseline:
        dump_to_file(os.path.abs(results_file), '%s/baseline-filename.txt' % result_directory)

    cmd = '-f %s -f %s -f resources/sunspider-analyze-results.js' % (prefix_file, results_file)
    if target_os == 'android':
        cmd = 'adb shell "cd %s && %s %s"' % (dir_android_sunspider, path_android_d8, cmd)
    else:
        cmd = '%s %s' % (js_shell_path, cmd)
    print cmd
    os.system(cmd)

    print '\nResults are located at %s' % results_file

    if run_instruments:
        newest_trace = newest_file('.', '\.trace$')
        if newest_trace:
            profile_file = '%s/sunspider-profile-$timeString.trace' % result_directory
            os.rename(newest_trace, profile_file)
            os.system('/usr/bin/open %s' % profile_file)
