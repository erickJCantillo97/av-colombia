<template>
  <div>
    <div class="col-lg-12 control-section">
      <div class="content-wrapper">
        <div class="schedule-overview">
          <div class="overview-content">
            <div class="left-panel">
              <div class="overview-scheduler">
                <ejs-schedule
                  :showQuickInfo="false"
                  :readonly="true"
                  id="scheduler"
                  :eventClick="onEventClick"
                  ref="scheduleObj"
                  height="100%"
                  cssClass="schedule-overview"
                  :currentView="currentView"
                  timezone="UTC"
                  :group="group"
                  :eventSettings="eventSettings"
                >
                  <e-views>
                    <e-view option="Day"></e-view>
                    <e-view option="Week"></e-view>
                    <e-view option="Month"></e-view>
                    <e-view option="Year"></e-view>
                  </e-views>
                  <e-resources>
                    <e-resource
                      field="CalendarId"
                      title="Calendars"
                      :dataSource="resourceDataSource"
                      :query="resourceQuery"
                      :allowMultiple="allowMultiple"
                      name="Calendars"
                      textField="CalendarText"
                      idField="CalendarId"
                      colorField="CalendarColor"
                    >
                    </e-resource>
                  </e-resources>
                </ejs-schedule>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createApp } from "vue";
import {
  ScheduleComponent,
  ViewDirective,
  ViewsDirective,
  ResourceDirective,
  ResourcesDirective,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  TimelineMonth,
  Year,
  TimelineViews,
  TimelineYear,
  Resize,
  DragAndDrop,
  Timezone,
  Print,
  ExcelExport,
  ICalendarImport,
  ICalendarExport,
} from "@syncfusion/ej2-vue-schedule";
import {
  addClass,
  extend,
  removeClass,
  closest,
  remove,
  isNullOrUndefined,
  Internationalization,
  createElement,
} from "@syncfusion/ej2-base";
import { DataManager, Predicate, Query } from "@syncfusion/ej2-data";
import { ButtonComponent, CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { UploaderComponent, TextBoxComponent } from "@syncfusion/ej2-vue-inputs";
import { DropDownButtonComponent } from "@syncfusion/ej2-vue-splitbuttons";
import {
  ToolbarComponent,
  ItemsDirective,
  ItemDirective,
} from "@syncfusion/ej2-vue-navigations";
import { TimePickerComponent } from "@syncfusion/ej2-vue-calendars";
import {
  MultiSelectComponent,
  DropDownListComponent,
} from "@syncfusion/ej2-vue-dropdowns";
import { MultiSelect, CheckBoxSelection } from "@syncfusion/ej2-dropdowns";
import { ContextMenuComponent } from "@syncfusion/ej2-vue-navigations";
import { AppBarComponent } from "@syncfusion/ej2-vue-navigations";
MultiSelect.Inject(CheckBoxSelection);

var app = createApp();

var liveTimeInterval;

export default {
  components: {
    "ejs-schedule": ScheduleComponent,
    "e-view": ViewDirective,
    "e-views": ViewsDirective,
    "e-resource": ResourceDirective,
    "e-resources": ResourcesDirective,
    "ejs-dropdownlist": DropDownListComponent,
    "ejs-appbar": AppBarComponent,
    "ejs-button": ButtonComponent,
    "ejs-uploader": UploaderComponent,
    "ejs-dropdownbutton": DropDownButtonComponent,
    "ejs-toolbar": ToolbarComponent,
    "e-items": ItemsDirective,
    "e-item": ItemDirective,
    "ejs-contextmenu": ContextMenuComponent,
    "ejs-timepicker": TimePickerComponent,
    "ejs-multiselect": MultiSelectComponent,
    "ejs-checkbox": CheckBoxComponent,
  },
  props: {
    reservas: Array,
  },
  data: function () {
    return {
      intl: new Internationalization(),
      eventSettings: { dataSource: this.generateEvents() },
      currentView: "Week",
      group: { resources: ["Calendars"] },
      resourceDataSource: [
        { CalendarText: "Calendario de Reservas", CalendarId: 1, CalendarColor: "#000" },
      ],
      resourceQuery: new Query().where("CalendarId", "equal", 1),
      allowMultiple: true,
      liveTimeUpdate: new Date().toLocaleTimeString("en-US", {
        timeZone: "America/Bogota",
      }),
      showFileList: false,
      multiple: false,
      calendarFields: { text: "CalendarText", value: "CalendarId" },

      timeSlotCountValue: 2,
      weekNumberValue: "Off",
      tooltipData: [
        { text: "Off", value: "Off" },
        { text: "On", value: "On" },
      ],
      tooltipValue: "Off",
      checkboxMode: "CheckBox",
      calendarsValue: [1],

      fields: { text: "text", value: "value" },

      selectedTarget: null,
    };
  },
  provide: {
    schedule: [
      Day,
      Week,
      WorkWeek,
      Month,
      Agenda,
      Resize,
      DragAndDrop,
      TimelineMonth,
      TimelineViews,
      Year,
      TimelineYear,
      Print,
      ExcelExport,
      ICalendarImport,
      ICalendarExport,
    ],
  },
  beforeUnmount: function () {
    if (liveTimeInterval) {
      clearInterval(liveTimeInterval);
    }
  },

  methods: {
    onEventClick: function (arg) {
      this.$emit("event-click", arg.event);
    },
    generateEvents: function () {
      const eventData = [];

      for (let reserva of this.reservas) {
        const fecha = reserva.date; // Formato yyyy-mm-dd
        const hora = reserva.hour; // Formato HH:ii

        // Combinar fecha y hora en una sola cadena
        const fechaHora = `${fecha}T${hora}`; // Añadir segundos para el formato completo

        // Crear un nuevo objeto Date
        const startDate = new Date(fechaHora);
        const endDate = new Date(fechaHora); //
        endDate.setHours(endDate.getHours() + 2);
        eventData.push({
          Id: reserva.id,
          Subject: reserva.service.title,
          StartTime: startDate,
          EndTime: endDate,
          Location: "Cartagena",
          Description: reserva.cliente_name,
          IsReadonly: true,
          CalendarId: 1,
        });
      }
      // for (let a = 0, id = 2; a < 500; a++) {
      //     const month = Math.floor(Math.random() * (11 - 0 + 1) + 0);
      //     const date = Math.floor(Math.random() * (28 - 1 + 1) + 1);
      //     const hour = Math.floor(Math.random() * (23 - 0 + 1) + 0);
      //     const minutes = Math.floor(Math.random() * (59 - 0 + 1) + 0);
      //     const start = new Date(new Date().getFullYear(), month, date, hour, minutes, 0);
      //     const end = new Date(start.getTime());
      //     end.setHours(end.getHours() + 2);
      //     startDate = new Date(start.getTime());
      //     endDate = new Date(end.getTime());
      //     eventData.push({
      //         Id: id,
      //         Subject: eventSubjects[Math.floor(Math.random() * (24 - 0 + 1) + 0)],
      //         StartTime: startDate,
      //         EndTime: endDate,
      //         Location: '',
      //         Description: 'Event Scheduled',
      //         IsAllDay: id % 10 === 0,
      //         IsReadonly: endDate < new Date(),
      //         CalendarId: (a % 4) + 1
      //     });
      //     id++;
      // }
      if (/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
        Timezone.prototype.offset = (date, zone) =>
          moment.tz.zone(zone).utcOffset(date.getTime());
      }
      const overviewEvents = extend([], eventData, null, true);
      const timezone = new Timezone();
      const utcTimezone = "UTC";
      const currentTimezone = timezone.getLocalTimezoneName();
      for (const event of overviewEvents) {
        event.StartTime = timezone.convert(event.StartTime, utcTimezone, currentTimezone);
        event.EndTime = timezone.convert(event.EndTime, utcTimezone, currentTimezone);
      }
      return overviewEvents;
    },
  },
};
</script>
