$(function() {

	var calendar = $('#calendar').fullCalendar({		
		
		firstDay: 1,
		header: {
			left: '',
			center: 'title',
		},			
		monthNames: [ 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь' ],
		monthNamesShort: [ 'Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.' ],
		dayNames: [ 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' ],
		dayNamesShort: [ "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ" ],
		buttonText: {
			prev: "&nbsp;&#9668;&nbsp;",
			next: "&nbsp;&#9658;&nbsp;",
			prevYear: "&nbsp;&lt;&lt;&nbsp;",
			nextYear: "&nbsp;&gt;&gt;&nbsp;",
			today: "Сегодня",
			month: "Месяц",
			week: "Неделя",
			day: "День"
		},		
		selectable: true,
		selectHelper: true,
		editable: true,
		
		select: function(start, end, allDay) {
			dialog.formOpen('add');
		},

		dayClick: function(date, allDay, jsEvent, view) {
			dialog.emptyForm();
			var newDate = $.fullCalendar.formatDate(date, format);
			event_id.val(jsEvent.timeStamp);
			event_start.val(newDate);
			event_end.val(newDate);
			dialog.formOpen('add');
		},

		eventClick: function(calEvent, jsEvent, view) {
			event_id.val(calEvent.id);
			event_theme.val(calEvent.title);
			event_start.val(calEvent.start);
			event_end.val(calEvent.end);
			event_reporter.val(calEvent.reporter);
			event_thesis.val(calEvent.thesis);
			event_present.val(calEvent.present);
			dialog.formOpen('edit');
		},

		viewDisplay : function(view) {
			if(typeof calendar !== 'undefined'){
				eventsManager.renderEvents(JSON.parse(localStorage.getItem('events')));

				//отрендерить temp events
				var tempEvents = eventsManager.tempEvents;
				for (var e in tempEvents) {
					calendar.fullCalendar('renderEvent', tempEvents[e]);
				}
			}
		}

	});

	var dialog = {

		init: function() {
			$('form').dialog({
				autoOpen: false,
		    	buttons: [{
			        id: 'add',
			        text: 'Добавить',
			        click: function() {

			        	calendar.fullCalendar('renderEvent', {
			            	id: event_id.val(),
			            	title: event_theme.val(),
			            	start: event_start.val(),
			            	end: event_end.val(),
			            	reporter: event_reporter.val(),
			            	thesis: event_thesis.val(),
			            	present: event_present.val()
			            });

			            //добавляем событие в localStorage как temp
			            var event_ = (calendar.fullCalendar('clientEvents', event_id.val()))[0];
			            eventsManager.tempEvents[event_id.val()] = event_;

			            dialog.emptyForm();
			            $('form').dialog('close');
			        }
			    },
			    {   id: 'edit',
			        text: 'Изменить',
			        click: function() {
			            var event_ = (calendar.fullCalendar('clientEvents', event_id.val()))[0];
						event_.title = event_theme.val();
						event_.start = event_start.val();
						event_.end = event_end.val();
						event_.reporter = event_reporter.val();
						event_.thesis = event_thesis.val();
						event_.present = event_present.val();

						calendar.fullCalendar('updateEvent', event_);
						//update temp event
						eventsManager.tempEvents[event_id.val()] = event_;
						
                        dialog.emptyForm();
			            $('form').dialog('close');
			        }
			    },
			    {   id: 'delete',
			        text: 'Удалить',
			        click: function() {
			            calendar.fullCalendar('removeEvents', event_id.val());
			            //delete from temp events
			            delete eventsManager.tempEvents[event_id.val()];

			            dialog.emptyForm();
			            $('form').dialog('close');

			    },
			    disabled: true
			    }]
			});
		},

		//подключение datetimepicker-ui
		includeDateTimePicker: function() {			
			event_start.datetimepicker({ hourGrid: 4, minuteGrid: 10, dateFormat: 'mm/dd/yy' });
			event_end.datetimepicker({ hourGrid: 4, minuteGrid: 10, dateFormat: 'mm/dd/yy' });
		},

		/** очистка формы */
		emptyForm: function () {
		    event_theme.val("");
		    event_start.val("");
		    event_end.val("");
			event_reporter.val("");
		    event_id.val("");
		    event_thesis.val("");
		    event_present.val("");
		},
		/* режимы открытия формы */
		formOpen: function (mode) {
		    if(mode == 'add') {
		        /* скрываем кнопки Удалить, Изменить и отображаем Добавить*/
		        $('#add').show();
		        $('#edit').hide();
		        $("#delete").button("option", "disabled", true);
		    }
		    else if(mode == 'edit') {
		        /* скрываем кнопку Добавить, отображаем Изменить и Удалить*/
		        $('#edit').show();
		        $('#add').hide();
		        $("#delete").button("option", "disabled", false);
		    }
		    $('form').dialog('open');
		}
	}


	var buttons = {

		setHandlers  : function(){

			$('.b-button-save').button().click(function() {
				if ('localStorage' in window && window['localStorage'] !== null) {
					var events = calendar.fullCalendar('clientEvents');
					localStorage.setItem('events', JSON.stringify(events));
				}
			});

			$('.b-button-import').button().click(function() {
				calendar.fullCalendar('removeEvents');
				eventsManager.tempEvents = [];
				eventsManager.eventsLoaded = true;
				eventsManager.renderEvents(JSON.parse(localStorage.getItem('events')));
			});

			$('.b-button-load').button().click(function() {

				$.getJSON('lections.json', function(data){
					calendar.fullCalendar('removeEvents');
					eventsManager.tempEvents = [];
					eventsManager.eventsLoaded = true;
					var lections = data;
					eventsManager.renderEvents(lections["lections"]);
				});				
			});

			$('.b-button-clean').button().click(function() {
				calendar.fullCalendar('removeEvents');
				eventsManager.eventsLoaded = false;
			});
		}
	}

	var eventsManager = {
		
		renderEvents : function(data){
			if(eventsManager.eventsLoaded !== true){ return; }
			var events = data;
			for (i = 0, len = events.length; i < len; i++){
				calendar.fullCalendar('renderEvent', events[i]);
			}		
		},

		eventsLoaded : false,
		tempEvents : {} 
	}
	

	//global members

	var event_theme = $('#event_theme'),
		event_start = $('#event_start'),
		event_end = $('#event_end'),
		event_reporter = $('#event_reporter'),
		event_thesis = $('#event_thesis'),
		event_present = $('#event_present'),
		calendar = $('#calendar'),
		form = $('#dialog-form'),
		event_id = $('#event_id'),
		format = "MM/dd/yyyy HH:mm";

	//main workflow

	dialog.init();
	dialog.includeDateTimePicker();
	buttons.setHandlers();
	eventsManager.tempEvents = {};
});