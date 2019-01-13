$(function () {
    skinChanger();
    activateNotificationAndTasksScroll();

    setSkinListHeightAndScroll();
    setSettingListHeightAndScroll();
    $(window).resize(function () {
        setSkinListHeightAndScroll();
        setSettingListHeightAndScroll();
    });
    demoInit();
});

function demoInit(){
    $('.nav-system li').on('click',function(){
        var $this = $(this);
        var $ul = $('.nav-system');
        $ul.find('li').removeClass('nav-system-selected');
        $this.addClass('nav-system-selected');
    });
    var calendar_option = {
        tmpl_path: "plugins/calendar/tmpls/",
        language: 'zh-CN',
        view: 'month',
        tmpl_cache: false,
        events_source: [],
        classes: {
			months: {
				general: 'label'
			}
        },
        onAfterViewLoad: function(view) {
            var $calendar = $('#calendar_b');
            $calendar.find('[data-cal-date="2019-01-10"]').parent().css('background-color','#FFCC66');
            $calendar.find('[data-cal-date="2019-01-10"]').append('<div>特保期间</div>');
            $calendar.find('[data-cal-date="2019-01-11"]').parent().css('background-color','#FFCC66');
            $calendar.find('[data-cal-date="2019-01-11"]').append('<div>特保期间</div>');

            var $cur_date_cell = $calendar.find('[data-cal-date="' + getnowtime() + '"]');
            $calendar.css('width','58%');
            $('#calendar_info_list').css('height',$calendar.height());
            //$cur_date_cell.parent().append('<div class="calendar_cell">值班人员：<br>张三</div>')
            //$cur_date_cell.parent().append('<div class="calendar_cell">联系方式：13439217422</div>')
		},
    };
    $('#calendar_b').calendar(calendar_option);

    var e_radar_1 = echarts.init(document.getElementById('e_radar_1'));
    var e_radar_1_option = {
        radar: {
            // shape: 'circle',
            name: {
              textStyle: {
                color: '#999999',
              }
            },
            splitArea: {
              areaStyle: {
                color: ['#fff', '#fff', '#fff', '#fff'],
                shadowColor: 'rgba(0, 100, 0, 0.3)'
              }
            },
            indicator: [
              {name: '访问响应时长', max: 6500},
              {name: '系统处理时长', max: 16000},
              {name: '资源使用率', max: 30000},
              {name: '创新能力', max: 38000},
              {name: '人才潜力', max: 52000},
              {name: '融资能力', max: 25000}
            ]
          },
          series: [{
            type: 'radar',
            data: [
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '数据',
                itemStyle: {
                  normal: {
                    color: 'rgba(5, 128, 242, 0.8)'
                  }
                },
                areaStyle: {
                  normal: {
                    color: '#0580f2'
                  }
                }
              }
            ]
          }]
    };
    e_radar_1.setOption(e_radar_1_option);
}

function getnowtime() {
    var nowtime = new Date();
    var year = nowtime.getFullYear();
    var month = padleft0(nowtime.getMonth() + 1);
    var day = padleft0(nowtime.getDate());
    return year + "-" + month + "-" + day;
}

function padleft0(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
}

//Skin changer
function skinChanger() {
    $('.right-sidebar .demo-choose-skin li').on('click', function () {
        var $body = $('body');
        var $this = $(this);

        var existTheme = $('.right-sidebar .demo-choose-skin li.active').data('theme');
        $('.right-sidebar .demo-choose-skin li').removeClass('active');
        $body.removeClass('theme-' + existTheme);
        $this.addClass('active');

        $body.addClass('theme-' + $this.data('theme'));
    });
}

//Skin tab content set height and show scroll
function setSkinListHeightAndScroll() {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.demo-choose-skin');

    $el.slimScroll({ destroy: true }).height('auto');
    $el.parent().find('.slimScrollBar, .slimScrollRail').remove();

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Setting tab content set height and show scroll
function setSettingListHeightAndScroll() {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.right-sidebar .demo-settings');

    $el.slimScroll({ destroy: true }).height('auto');
    $el.parent().find('.slimScrollBar, .slimScrollRail').remove();

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Activate notification and task dropdown on top right menu
function activateNotificationAndTasksScroll() {
    $('.navbar-right .dropdown-menu .body .menu').slimscroll({
        height: '254px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}
