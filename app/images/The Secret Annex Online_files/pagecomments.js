/**
* static object that handles page logic
* @class 
* @constructor
* @param {jQuery} $ Reference to the jQuery object
*/
var PageComments = function ($) {

    /**
    * @namespace Private methods and variables
    */
    var priv = {

        UnbindCommentHandlers: function () {
            $('a.paginglink, .ajaxpager a.forward, .ajaxpager a.backward, a.showmorereactions, a.showlessreactions').unbind('click');
        },

        DisablePaginationLinks: function () {
            $('a.paginglink, .ajaxpager a.forward, .ajaxpager a.backward, a.showmorereactions, a.showlessreactions').attr('disabled', 'disabled');
        },

        BindCommentHandlers: function () {
            $('a.paginglink').bind('click', function (event) {
                var pageNumber = parseInt($(this).text()) - 1;
                priv.GetComments(pageNumber);
                return false;
            });
            $('.ajaxpager a.forward').bind('click', function (event) {
                var pageNumber = parseInt($("input[id$='hidCurrentPageNr']").val());
                priv.GetComments(pageNumber + 1);
                return false;
            });
            $('.ajaxpager a.backward').bind('click', function (event) {
                var pageNumber = parseInt($("input[id$='hidCurrentPageNr']").val());
                priv.GetComments(pageNumber - 1);
                return false;
            });
            $('a.showmorereactions').bind('click', function (event) {
                priv.GetComments(0);
                return false;
            });
            $('a.showlessreactions').bind('click', function (event) {
                priv.GetComments(-1);
                //
                $('span.readmore').hide();
                $('a.readmore').show();
                return false;
            });
        },

        BindShowLessMoreClicks: function () {
            $('.comment p span.commentpart1').each(function () {
                var $commentPart1 = $(this);
                var $commentPart2 = $(this).siblings('span.commentpart2');
                if ($commentPart2.length) {
                    $('&nbsp;<a class="more">' + resources.commentreadmore + '</a>').insertAfter($commentPart1)
                        .bind('click', function (event) {
                            $(this).hide();
                            $commentPart2.show();
                            $commentPart1.siblings('a.less').show();
                        });
                    $('&nbsp;<a class="less">' + resources.commentreadless + '</a>').insertAfter($commentPart2)
                        .bind('click', function (event) {
                            $(this).hide();
                            $commentPart2.hide();
                            $commentPart1.siblings('a.more').show();
                        });
                }
            });
            $('.comment p span.commentpart2').hide();
            $('.comment p a.more').show();
            $('.comment p a.less').hide();
        },

        GetComments: function (pageNum) {
            priv.DisablePaginationLinks();

            // Read data
            var pageId = $("input[id$='_hidPageId']").val();
            var cultureId = resources.uiculture_lcid;
            var langCode = $("input[id$='_hidLang']").val();
            var ispreview = pageNum == -1 ? 1 : 0;

            $.ajax({
                type: "GET",
                url: resources.base_url + "handlers/GetCommentsHtml.ashx",
                data: { preview: ispreview, pageid: pageId, pagenr: pageNum, lang: langCode, culture: cultureId },
                success: function (data) {
                    $('#commentsholder').hide();
                    $('#commentsholder').html(data);
                    $('#commentsholder').slideDown('slow');

                    // Rebind the clickhandlers because the links are refreshed
                    priv.UnbindCommentHandlers();
                    priv.BindCommentHandlers();
                    priv.BindShowLessMoreClicks();

                    $("input[id$='hidCurrentPageNr']").val(pageNum);
                }
                //,
                //error: function() {
                //    location.href = redirectUrl;
                //}
            });
        }
    };

    /** @scope Main */
    return {

        /**
        * Initializes the logic for the current page
        * to be called on $(document).ready
        */
        OnReady: function () {
            priv.BindShowLessMoreClicks();
            priv.BindCommentHandlers();
            /*$('#commentformhiddenpart').hide();
            $("textarea[id$='_txtComment']").bind("focus", function(event) {
            $('#commentformhiddenpart').slideDown('slow');
            });*/

        }
    };
} (jQuery);


$(document).ready(function($) {
    PageComments.OnReady();
});






