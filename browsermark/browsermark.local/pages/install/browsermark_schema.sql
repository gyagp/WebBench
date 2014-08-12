###
# Browsermark database schema
#
# Last update: 2012-11-12
# By: Jouni Tuovinen <jouni.tuovinen@rightware.com>
#
# Database rights (where applicable): Rightware Oy / Jouni Tuovinen
# Copyright (c) 2012 Rightware Oy. Unlicensed use of database schema prohibited
###

###
# result_summaries
#
# Summary table of all individual results.
# PK: result_summary_id
# FK: browser_info_id
# FK: os_info_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS result_summaries
(
    result_summary_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    browser_info_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    result_meta_id BIGINT UNSIGNED NOT NULL,
    general_user_id BIGINT UNSIGNED NOT NULL DEFAULT 0,
    summary_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    overall_score FLOAT UNSIGNED NOT NULL,
    INDEX(browser_info_id),
    INDEX(os_info_id),
    INDEX(general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# result_meta
#
# Results meta information
# PK: result_meta_id
###
CREATE TABLE IF NOT EXISTS result_meta
(
    result_meta_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    valid TINYINT(1) UNSIGNED NOT NULL DEFAULT 1,
    result_version VARCHAR(8) NOT NULL,
    user_agent VARCHAR(256) NOT NULL,
    detected_name VARCHAR(64) NULL,
    given_name VARCHAR(255) NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# test_meta
#
# Store conformity tests and benchmark tests meta information
# PK: test_meta_id
# FK: test_id
###
CREATE TABLE IF NOT EXISTS test_meta
(
    test_meta_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    is_conformity TINYINT(1) UNSIGNED NOT NULL DEFAULT 0 COMMENT
        'if test_id points to conformity_tests set this to 1',
    test_id BIGINT UNSIGNED NOT NULL,
    meta_information MEDIUMTEXT NOT NULL,
    INDEX(is_conformity, test_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# conformity_tests
#
# Conformity test results
# PK: conformity_test_id
# FK: result_summary_id
# FK: browsermark_test_id
###
CREATE TABLE IF NOT EXISTS conformity_tests
(
    conformity_test_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    result_summary_id BIGINT UNSIGNED NOT NULL,
    browsermark_test_id BIGINT UNSIGNED NOT NULL,
    test_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    conformity_score FLOAT UNSIGNED NOT NULL,
    raw_score FLOAT UNSIGNED NOT NULL,
    max_score FLOAT UNSIGNED NOT NULL,
  INDEX(result_summary_id),
  INDEX(browsermark_test_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# browsermark_tests
#
# Conformity tests and benchmark tests data
# PK: browsermark_test_id
###
CREATE TABLE IF NOT EXISTS browsermark_tests
(
    browsermark_test_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    test_name VARCHAR(32) NOT NULL,
    test_version VARCHAR(8) NOT NULL,
    UNIQUE(test_name, test_version)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# browsermark_groups
#
# Browsermark groups
# PK: browsermark_group_id
###
CREATE TABLE IF NOT EXISTS browsermark_groups
(
    browsermark_group_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    group_name VARCHAR(32) NOT NULL,
    group_version VARCHAR(8) NOT NULL,
    UNIQUE(group_name, group_version)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO browsermark_groups VALUES(1, 0, 'Single Test', 'Custom');

###
# benchmark_group_results
#
# Benchmark group results
# PK: benchmark_group_result_id
# FK: result_summary_id
# FK: browsermark_group_id
###
CREATE TABLE IF NOT EXISTS benchmark_group_results
(
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    result_summary_id BIGINT UNSIGNED NOT NULL,
    browsermark_group_id BIGINT UNSIGNED NOT NULL,
    group_score FLOAT UNSIGNED NOT NULL,
    INDEX(result_summary_id),
    INDEX(browsermark_group_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# benchmark_tests
#
# Individual benchmark test results
# PK: benchmark_test_id
# FK: result_summary_id
# FK: benchmark_group_result_id
# FK: browsermark_group_id
# FK: browsermark_test_id
###
CREATE TABLE IF NOT EXISTS benchmark_tests
(
    benchmark_test_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    result_summary_id BIGINT UNSIGNED NOT NULL,
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL,
    browsermark_group_id BIGINT UNSIGNED NOT NULL,
    browsermark_test_id BIGINT UNSIGNED NOT NULL,
    test_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    benchmark_score FLOAT UNSIGNED NOT NULL,
    compare_score FLOAT UNSIGNED NOT NULL,
    raw_score FLOAT UNSIGNED NOT NULL,
    INDEX(result_summary_id),
    INDEX(benchmark_group_result_id),
    INDEX(browsermark_group_id),
    INDEX(browsermark_test_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# browser_layout_engines
#
# Different browser layout engines
# PK: browser_layout_engine
###
CREATE TABLE IF NOT EXISTS browser_layout_engines
(
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL PRIMARY KEY
        AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    engine_name VARCHAR(64) NOT NULL,
    engine_major_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    engine_minor_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    engine_build_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    engine_revision_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE(engine_name, engine_major_version, engine_minor_version,
        engine_build_version, engine_revision_version)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO browser_layout_engines VALUES
(1, 0, 'Unknown', 0, 0, 0, 0);

###
# browser_info
#
# Browser information
# PK: browser_info
# FK: browser_layout_engine_id
###
CREATE TABLE IF NOT EXISTS browser_info
(
    browser_info_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    browser_name VARCHAR(64) NOT NULL,
    browser_major_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    browser_minor_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    browser_build_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    browser_revision_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    INDEX(browser_layout_engine_id),
    UNIQUE(browser_layout_engine_id, browser_name, browser_major_version, browser_minor_version,
        browser_build_version, browser_revision_version)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO browser_info VALUES
(1, 0, 1, 'Unknown', 0, 0, 0, 0);

###
# os_info
#
# OS information
# PK: os_info_id
###
CREATE TABLE IF NOT EXISTS os_info
(
    os_info_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    os_name VARCHAR(64) NOT NULL,
    os_major_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    os_minor_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    os_build_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    os_revision_version SMALLINT(4) UNSIGNED NOT NULL DEFAULT 0,
    UNIQUE(os_name, os_major_version, os_minor_version, os_build_version,
        os_revision_version)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO os_info VALUES
(1, 0, 'Unknown', 0, 0, 0, 0);

###
# general_settings
# Settings storage for site, tests and other pages
#
# PK: setting_id
# FK: target_id (either page or test id)
###
CREATE TABLE IF NOT EXISTS browsermark_settings
(
    general_setting_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT UNSIGNED NOT NULL DEFAULT 0,
    target TINYINT UNSIGNED NOT NULL COMMENT
        '1 = common, 2 = test, 3 = single page',
    type TINYINT UNSIGNED NOT NULL COMMENT
        '1 = variable, 2 = ini_set, 3 = array',
    target_id BIGINT UNSIGNED NULL,
    cast VARCHAR(6) NULL COMMENT
        'int, bool, float, array, object, unset',
    name VARCHAR(32) NOT NULL,
    value VARCHAR(255) NOT NULL COMMENT
        'string or array|of|strings',
    INDEX(target_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# general_categories
#
# Currently only Undefined, Desktop, Tablet, Phone
# PK: general_category_id
###
CREATE TABLE IF NOT EXISTS general_categories
(
    general_category_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    category_name VARCHAR(16) NOT NULL,
    UNIQUE(category_name)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO general_categories VALUES
(1, 0, 'Unknown'),
(2, 0, 'Desktop'),
(3, 0, 'Tablet'),
(4, 0, 'Phone');

###
# general_users
#
# Users table
# PK: general_users_id
###
CREATE TABLE IF NOT EXISTS general_users
(
    general_users_id BIGINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    deleted TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    approved TINYINT(1) UNSIGNED NOT NULL DEFAULT 0,
    user_level TINYINT(2) UNSIGNED NOT NULL DEFAULT 0,
    secret_key VARCHAR(16) NULL,
    user_email VARCHAR(314) NOT NULL,
    user_pass VARCHAR(32) NOT NULL,
    user_firstname VARCHAR(128) NULL,
    user_lastname VARCHAR(128) NULL,
    user_company VARCHAR(128) NULL,
    UNIQUE(user_email)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_conformity_tests_browser_info
#
# Key table between conformity_tests and browser_info
# FK: conformity_test_id
# FK: browser_info_id
###
CREATE TABLE IF NOT EXISTS key_conformity_tests_browser_info
(
    conformity_test_id BIGINT UNSIGNED NOT NULL,
    browser_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(conformity_test_id, browser_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_conformity_tests_browser_layout_engines
#
# Key table between conformity_tests and browser_layout_engines
# FK: conformity_test_id
# FK: browser_layout_engine_id
###
CREATE TABLE IF NOT EXISTS key_conformity_tests_browser_layout_engines
(
    conformity_test_id BIGINT UNSIGNED NOT NULL,
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(conformity_test_id, browser_layout_engine_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_conformity_tests_os_info
#
# Key table between conformity_tests and os_info
# FK: conformity_test_id
# FK: os_info_id
###
CREATE TABLE IF NOT EXISTS key_conformity_tests_os_info
(
    conformity_test_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(conformity_test_id, os_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_conformity_tests_general_categories
#
# Key table between conformity_tests and general_categories
# FK: conformity_test_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS key_conformity_tests_general_categories
(
    conformity_test_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(conformity_test_id, general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_group_results_browser_info
#
# Key table between benchmark_group_results and browser_info
# FK: benchmark_group_result_id
# FK: browser_info_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_group_results_browser_info
(
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL,
    browser_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_group_result_id, browser_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_group_results_browser_layout_engines
#
# Key table between benchmark_group_results and browser_layout_engines
# FK: benchmark_group_result_id
# FK: browser_layout_engine_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_group_results_browser_layout_engines
(
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL,
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_group_result_id, browser_layout_engine_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_group_results_os_info
#
# Key table between benchmark_group_results and os_info
# FK: benchmark_group_result_id
# FK: os_info_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_group_results_os_info
(
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_group_result_id, os_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_group_results_general_categories
#
# Key table between benchmark_group_results and general_categories
# FK: benchmark_group_result_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_group_results_general_categories
(
    benchmark_group_result_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_group_result_id, general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_tests_browser_info
#
# Key table between benchmark_tests and browser_info
# FK: benchmark_test_id
# FK: browser_info_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_tests_browser_info
(
    benchmark_test_id BIGINT UNSIGNED NOT NULL,
    browser_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_test_id, browser_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_tests_browser_layout_engines
#
# Key table between benchmark_tests and browser_layout_engines
# FK: benchmark_test_id
# FK: browser_layout_engine_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_tests_browser_layout_engines
(
    benchmark_test_id BIGINT UNSIGNED NOT NULL,
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_test_id, browser_layout_engine_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_tests_os_info
#
# Key table between benchmark_tests and os_info
# FK: benchmark_test_id
# FK: os_info_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_tests_os_info
(
    benchmark_test_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_test_id, os_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_benchmark_tests_general_categories
#
# Key table between benchmark_tests and general_categories
# FK: benchmark_test_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS key_benchmark_tests_general_categories
(
    benchmark_test_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(benchmark_test_id, general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_browser_info_os_info
#
# Key table between browser_info and os_info
# FK: browser_info_id
# FK: os_info_id
###
CREATE TABLE IF NOT EXISTS key_browser_info_os_info
(
    browser_info_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(browser_info_id, os_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_browser_info_general_categories
#
# Key table between browser_info and general_categories
# FK: browser_info_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS key_browser_info_general_categories
(
    browser_info_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(browser_info_id, general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_browser_layout_engines_os_info
#
# Key table between browser_layout_engines and os_info
# FK: browser_layout_engine_id
# FK: os_info_id
###
CREATE TABLE IF NOT EXISTS key_browser_layout_engines_os_info
(
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    os_info_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(browser_layout_engine_id, os_info_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# key_browser_layout_engines_general_categories
#
# Key table between browser_layout_engines and general_categories
# FK: browser_layout_engine_id
# FK: general_category_id
###
CREATE TABLE IF NOT EXISTS key_browser_layout_engines_general_categories
(
    browser_layout_engine_id BIGINT UNSIGNED NOT NULL,
    general_category_id BIGINT UNSIGNED NOT NULL,
    UNIQUE(browser_layout_engine_id, general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

###
# continent_servers
#
# table for continent servers that are used in network speed test.
# PK: continent_server_id
###
CREATE TABLE continent_servers (
  continent_server_id tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  server_name varchar(64) CHARACTER SET latin1 NOT NULL,
  server_url varchar(255) CHARACTER SET latin1 NOT NULL,
  PRIMARY KEY (continent_server_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO continent_servers VALUES
(1, 'localhost', '');

###
# isp_info
#
# info table for ISP details
# PK: isp_info_id
###
CREATE TABLE isp_info (
  isp_info_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  deleted tinyint(1) unsigned NOT NULL DEFAULT '0',
  isp_name varchar(255) NOT NULL,
  isp_logo varchar(64) DEFAULT NULL,
  isp_address1 varchar(128) DEFAULT NULL,
  isp_address2 varchar(128) DEFAULT NULL,
  isp_city varchar(128) DEFAULT NULL,
  isp_province varchar(128) DEFAULT NULL,
  isp_zip varchar(128) DEFAULT NULL,
  isp_country varchar(128) DEFAULT NULL,
  isp_phone varchar(64) DEFAULT NULL,
  isp_fax varchar(64) DEFAULT NULL,
  isp_url varchar(128) DEFAULT NULL,
  PRIMARY KEY (isp_info_id),
  UNIQUE KEY isp_name (isp_name)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

INSERT INTO isp_info (deleted, isp_name) VALUES
(1, 'Unknown');

###
# isp_results
#
# results information for ISP network speed test. Please note that this test use ip2location services so in customer
# version ISP is always 'Unknown'
# PK: isp_meta_id
# FK: result_summary_id
# FK: continent_server_id
###
CREATE TABLE isp_results (
  isp_result_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  result_summary_id bigint(20) unsigned NOT NULL,
  continent_server_id tinyint(3) unsigned NOT NULL,
  isp_info_id bigint(20) unsigned NOT NULL,
  general_category_id bigint(20) NOT NULL,
  ping_average_milliseconds smallint(5) unsigned NOT NULL,
  download_average_kbit float(11,4) unsigned NOT NULL,
  upload_average_kbit float(11,4) unsigned NOT NULL,
  download_min_kbit float(11,4) unsigned NOT NULL,
  download_max_kbit float(11,4) unsigned NOT NULL,
  variance_percentage float(5,2) unsigned NOT NULL,
  PRIMARY KEY (isp_result_id),
  KEY result_summary_id (result_summary_id),
  KEY continent_server_id (continent_server_id),
  KEY isp_info_id (isp_info_id),
  KEY general_category_id (general_category_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;