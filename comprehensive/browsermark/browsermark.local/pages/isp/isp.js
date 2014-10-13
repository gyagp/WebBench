$(document).ready(function()
{
    // Get original values for spans
    $('span[data-mode="kbit"]').each(function()
    {
        $(this).attr('data-original', $(this).html());
    });

    // Display mode
    $('a.display-mode').click(function()
    {
        // Only if item was not selected before
        if (!$(this).hasClass('selected'))
        {
            // Toggle selected class
            $('a.display-mode').toggleClass('selected');
            dataMode = $(this).attr('data-mode');
            // if mbit-mode selected
            if (dataMode == 'mbit')
            {
                $('span[data-mode="kbit"]').each(function()
                {
                    $(this).attr('data-mode', 'mbit');
                    $(this).html(Math.round($(this).attr('data-original') / 1024 * 100) / 100);
                });
                $('span[data-display="kbit"]').each(function()
                {
                    $(this).attr('data-display', 'mbit');
                    $(this).html('Mbit/s');
                });
            }
            // Otherwise kbit-mode selected
            else
            {
                $('span[data-mode="mbit"]').each(function()
                {
                    $(this).attr('data-mode', 'kbit');
                    $(this).html($(this).attr('data-original'));
                });
                $('span[data-display="mbit"]').each(function()
                {
                    $(this).attr('data-display', 'kbit');
                    $(this).html('kbit/s');
                });
            }
        }
    })
})