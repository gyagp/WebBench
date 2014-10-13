var ids = [];
var dashboard = {
    latestResults: function()
    {
        // If latest results contain user id, use it
        var userId = $('#latest-results').attr('data-user-id');
        var extraQuery = (userId) ? '?user_id=' + userId : '';
        $.ajax({
            url: '/ajax/latest_results' + extraQuery,
            dataType: 'json'
        }).done(function(data)
        {
            content = '<div class="column half" style="overflow: hidden">';
            interval = 300;
            lowest = 0;
            highest = 0;
            middle = Math.round(data.length / 2) - 1;
            $.each(data, function(i, d)
            {
                if (d.timestamp < lowest)
                {
                    lowest = d.timestamp;
                }
                if (d.timestamp > highest)
                {
                    highest = d.timestamp;
                }
                number = (i + 1) < 10 ? '0' + (i + 1) : (i + 1);
                spanClass = (ids.length == 20 && ids.indexOf(d.result_summary_id) == -1) ? ' class="highlight"' : '';
                content += '<span' + spanClass + '>' + number + '. <a href="/results/' + d.result_summary_id + '" target="_blank">' + d.summary_time + '</a>: ' + Math.round(d.overall_score);
                content += ' ('+ d.category + ' ' + d.system + ' with ' + d.browser + ')<br></span>';
                if (i == middle)
                {
                    content += '&nbsp;</div><div class="column half" style="overflow: hidden">';
                }
                ids[i] = d.result_summary_id;
            });
            content += '&nbsp;</div><br clear="all">&nbsp;';
            $('#latest-results').html(content);

            // Analyze data if we need faster refresh interval
            if ((highest - lowest) < interval)
            {
                interval = highest - lowest;
            }
            // Interval should not be under 5 seconds either
            if (interval < 5)
            {
                interval = 5;
            }

            interval = interval * 1000;
            setTimeout('dashboard.latestResults()', interval);
        });
    }
};

var resultsTable = {
    create: function(data)
    {
        var headingsDone = false;
        var table = '<table>';
        var colspan = 13;
        $.each(data, function(name, value)
        {
            if (!headingsDone)
            {
                table += '<tr>';
                $.each(value, function(subName, subValue)
                {
                    if (subName == 'user-agent')
                    {
                        // User-Agent comes in it own row
                        table += '<tr><th colspan="' + colspan + '" class="' + subName + '">' + subValue + '</th></tr>';
                    }
                    // Valid gets "select all"
                    else if (subName == "valid")
                    {
                        table += '<th class="' + subName + '">' + subValue + '<br><input type="checkbox" id="select-all-valid" value="1"></th>';
                    }
                    else
                    {
                        table += '<th class="' + subName + '">' + subValue + '</th>';
                    }
                });
                table += '</tr>';
                headingsDone = true;
            }
            else
            {
                var categories = ['Desktop', 'Tablet', 'Phone'];
                $.each(value, function(subName, subValue)
                {
                    subValue = subValue == null ? '' : subValue;
                    switch (subName)
                    {
                        case 'summary-id':
                            table += '<tr data-id="' + subValue + '"><td class="' + subName + '"><a href="/results/' + subValue + '/?ignore" target="_blank">' + subValue + '</a></td>';
                            break;
                        case 'valid':
                        case 'deleted':
                            checked = subValue == 1 ? ' checked' : '';
                            table += '<td class=" ' + subName + '"><input type="checkbox" name="' + subName + '" value="1" data-has-changed="0" ' + checked + '></td>';
                            break;
                        case 'category':
                            table += '<td class="' + subName + '"><select name="category" data-has-changed="0">';
                            $.each(categories, function(i, cat)
                            {
                                val = i+2;
                                var sel = (cat == subValue) ? ' selected="selected"' : '';
                                table += '<option value="' + val + '"' + sel + '>' + cat + '</option>';
                            });
                            table += '</select></td>';
                            break;
                        case 'detected-name':
                            table += '<td class="' + subName + '"><input type="text" list="devices" name="detected-name" data-has-changed="0" value="' + subValue + '"></td>';
                            break;
                        case 'user-agent':
                            // User-Agent comes in it own row
                            table += '<tr><td colspan="' + colspan + '" class="' + subName + '">' + subValue + '</td></tr>';
                            break;
                        default:
                            table += '<td class="' + subName + '">' + subValue + '</td>';
                            break;
                    }
                });
                table += '</tr>';
            }
        });
        table += '<tr><td id="final-row" colspan="' + colspan + '"><input id="save-results-submit" type="submit" value="Save changes"></td></tr></table>';
        $('div#results-list').html(table);

        $('input#select-all-valid').change(function()
        {
            if ($(this).attr('checked'))
            {
                $('td.valid input').attr('checked', 'checked');
            }
            else
            {
                $('td.valid input').removeAttr('checked');
            }
        });

        // Modify data-has-changed if form element is changed
        $('div#results-list table tr td input[name=valid], div#results-list table tr td input[name=deleted], div#results-list table tr td select[name=category], div#results-list table tr td input[name=detected-name]').change(function()
        {
            $(this).attr('data-has-changed', 1);
        });

        $('input#save-results-submit').click(function()
        {
            resultsTable.save()
        });
    },
    save: function()
    {
        // Empty possible old results
        $('#final-row p').remove();

        // Loop through each results list table row and save if data has changed
        var changed = [];
        $('div#results-list table tr').each(function()
        {
            dataId = $(this).attr('data-id');
            _this = this;
            $(this).find('*[data-has-changed="1"]').each(function()
            {
                dataName = $(this).attr('name');
                dataValue = (dataName == 'valid') ? ($(this).attr('checked') ? 1 : 0) : $(this).val();
                changed.push(
                {
                    'id': dataId,
                    'name': dataName,
                    'value': dataValue
                });
                // If result is marked as deleted, add class for tr so we can remove row after ajax call
                if (dataName == 'deleted' && dataValue == 1)
                {
                    $(_this).addClass('ajax-remove-row');
                    $(_this).next('tr').addClass('ajax-remove-row');
                }
            });
        });

        // Send changes via ajax
        $.post('/ajax/manage_results',
        {
            update: 1,
            changes: changed
        }, function(response)
        {
            // Change dropdown to -- select --
            $('#manage-results-version').val(0);
            // Remove deleted rows
            $('div#results-list table tr.ajax-remove-row').remove();
            // Update final row to contain results
            var results = '<p>Changes done!</p>';
            $.each(response, function(i, d)
            {
                results += '<p><a href="/results/' + i + '/?ignore" target="_blank">ID ' + i + ':</a>';
                if (typeof d.deleted != 'undefined')
                {
                    results += '<br />- Data delete '+ (d.deleted == true ? 'success' : 'failed, reason: ' + d.deleted);
                }
                if (typeof d.undeleted != 'undefined')
                {
                    results += '<br />- Data undelete '+ (d.undeleted == true ? 'success' : 'failed, reason: ' + d.undeleted);
                }
                if (typeof d.meta != 'undefined')
                {
                    results += '<br />- Data meta information update '+ (d.meta == true ? 'success' : 'failed, reason: ' + d.meta);
                }
                if (typeof d.summary != 'undefined')
                {
                    results += '<br />- Data summary information update '+ (d.summary == true ? 'success' : 'failed, reason: ' + d.summary);
                }
                results += '</p>';
            });
            $('#final-row').append(results);
        }, 'json');
    }
};

$(document).ready(function()
{
    if ($('#latest-results').length != 0)
    {
        dashboard.latestResults();
    }

    $('table.visualize').hide();
    $('table.visualize').visualize(
        {
            type: 'line',
            yLabelInterval: 70,
            lineWeight: 2,
            colors: ['#ffffff','#ff3333','#993300','#999900','#990066','#009900','#009999','#cc9966','#666666','#ff6600','#000099','#33ff33','#ffff33','#99ccff','#000000','#827800']
        }
    );
    $('.tabcontent').hide();
    $('.tabcontent').first().show();

    $('.tab').click(function()
    {
        if (!$(this).hasClass('selectedtab'))
        {
            $('.tab').removeClass('selectedtab');
            $(this).addClass('selectedtab');
        }
        var id = $(this).attr('id');
        if ($("." + id).css('display') == 'none')
        {
            $('.tabcontent').hide();
            $("." + id).show();
        }
    });

    // If group by is changed
    $('select[name=group_by]').change(function()
    {
        // Disable all value fields
        $('select[name=value_field] option').attr('disabled', 'disabled');
        switch($(this).val())
        {
            case "1": // Test
                // Enable test score
                $('select[name=value_field] option:first-of-type').removeAttr('disabled');
                $('select[name=value_field]').val('1');
                break;
            case "2": // Group
                // Enable group score
                $('select[name=value_field] option:nth-of-type(2)').removeAttr('disabled');
                $('select[name=value_field]').val('2');
                break;
            default: // Others
                // Enable all
                $('select[name=value_field] option').removeAttr('disabled');
                $('select[name=value_field]').val('3');
                break;
        }
    });

    // If limit field is changed
    $('select[name=limit_field]').change(function()
    {
       // Get values for limit_value
       $.ajax({
           url: '/ajax/search',
           data: {list: $('select[name=limit_field]').val()},
           dataType: 'json'
       }).done(function(dataValue)
       {
           $('select[name=limit_value]').empty();

           $.each(dataValue, function(i, v)
           {
               var table = (v.indexOf('Conformity') == -1) ? 'benchmark' : 'conformity';
               $('select[name=limit_value]').append('<option data-table="' + table + '" value="' + i + '">' + v + '</option>');
           });
       });
    });

    // If limit value is changed
    /*$('select[name=limit_value]').change(function()
    {
        if ($(this).val() == '0')
        {
            // Disable 'NOT'
            $('input[name=not_value]').attr('disabled', 'disabled');
            $('input[name=not_value]').removeAttr('checked');
            $('input[name=not_value]').parent('label').addClass('disabled');
        }
        else
        {
            // Enable 'NOT
            $('input[name=not_value]').removeAttr('disabled', 'disabled');
            $('input[name=not_value]').parent('label').removeClass('disabled');
        }
    });*/

    // Time value changes
    $('select[name=display_value]').change(function()
    {
        if ($(this).val() == '3' || $(this).val() == '5')
        {
            $('select[name=results_group]').removeAttr('disabled');
        }
        else
        {
            $('select[name=results_group]').attr('disabled', 'disabled');
        }
    });

    $('select[name=time_value]').change(function()
    {
        // Disable all
        $('select[name=results_group] option').attr('disabled', 'disabled');

        switch ($(this).val())
        {
            case "1":
                // 24 hours selected, only available values are hourly and daily
                $('select[name=results_group] option:nth-of-type(1)').removeAttr('disabled');
                $('select[name=results_group] option:nth-of-type(2)').removeAttr('disabled');
                break;
            case "2":
                // week selected, only available values are daily and weekly
                $('select[name=results_group] option:nth-of-type(2)').removeAttr('disabled');
                $('select[name=results_group] option:nth-of-type(3)').removeAttr('disabled');
                break;
            case "4":
                // year selected, only available values are monthly and yearly
                $('select[name=results_group] option:nth-of-type(4)').removeAttr('disabled');
                $('select[name=results_group] option:nth-of-type(5)').removeAttr('disabled');
                break;
            default:
                // Last / specific month selected, only available values are daily, weekly and monthly
                $('select[name=results_group] option:nth-of-type(2)').removeAttr('disabled');
                $('select[name=results_group] option:nth-of-type(3)').removeAttr('disabled');
                $('select[name=results_group] option:nth-of-type(4)').removeAttr('disabled');
                break;
        }

        // Selected value
        if ($('select[name=results_group] option:selected').attr('disabled') == 'disabled')
        {
            // Change value to first available value
            $('select[name=results_group] option:enabled').first().attr('selected', 'selected');
        }
    });

    // If search form is submitted
    $('form#ajax-admin-search').submit(function()
    {
        // Append $('select[name=limit_value]') data-table value
        $('<input>').attr({type: 'hidden', name: 'data-table', value: $('select[name=limit_value] option:selected').attr('data-table')}).appendTo('form#ajax-admin-search');
        $('div#ajax-admin-search-result').load('/dashboard/search/get_results', $('form#ajax-admin-search').serializeArray());
        return false;
    });

    // If manage-results-version is changed
    $('select#manage-results-version').change(function()
    {
        if ($(this).val() != 0)
        {
            // Empty results div
            $('div#results-list').html('');

            // Update h2
            $('h2#results-title').html('Non-deleted, invalid results in version ' + $(this).val());

            // Get results
            $.ajax(
            {
                url: '/ajax/manage_results',
                type: 'POST',
                data: {version: $(this).val()},
                dataType: 'json'
            }).done(function(data)
            {
                resultsTable.create(data);
            });
        }

    });

    // If ID
    $('input#manage-results-submit').click(function()
    {
        var summaryId = $('input#manage-results-id').val();
        if (summaryId)
        {
            // Empty results div
            $('div#results-list').html('');

            // Update h2
            $('h2#results-title').html('Details for result ID ' + summaryId);

            // Get results
            $.ajax(
            {
                url: '/ajax/manage_results',
                type: 'POST',
                data: {summary_id: summaryId},
                dataType: 'json'
            }).done(function(data)
            {
                resultsTable.create(data);
            });
        }
    });

    // Users list
    $('table#list-users input, table#list-users select').change(function()
    {
        $(this).attr('data-has-changed', 1);
    });

    $('input#change-users-detail').click(function()
    {
        // Loop through each table row to find changed data
        var tableData = [];
        $('table#list-users tr').each(function()
        {
            rowId = $(this).attr('data-id');
            _this = this;
            $(this).find('*[data-has-changed="1"]').each(function()
            {
                fieldName = $(this).attr('name');
                fieldValue = (fieldName == 'approved') ? ($(this).attr('checked') ? 1 : 0) : $(this).val();
                tableData.push(
                {
                    'id': rowId,
                    'name': fieldName,
                    'value': fieldValue
                });

                // If result is marked as deleted, add class for tr so we can remove row after ajax call
                if (fieldName == 'deleted' && fieldValue == 1)
                {
                    $(_this).addClass('ajax-remove-row');
                }
            });
        });

        if (tableData.length > 0)
        {
            $.ajax({
               url: '/ajax/manage_users',
               type: 'POST',
                data: {update: tableData}
            }).done(function(response)
            {
                $('div#users-update-result').html(response);
                // Delete marked rows
                $('tr.ajax-remove-row').remove();
                // Change remaining fields o unchanged
                $('*[data-has-changed="1"]').attr('data-has-changed', 0);
            });
        }
    })
});