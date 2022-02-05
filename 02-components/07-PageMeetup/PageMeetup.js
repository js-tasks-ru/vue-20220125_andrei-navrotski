import { defineComponent } from './vendor/vue.esm-browser.js';
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import MeetupView from '../06-MeetupView/MeetupView.js';
import { fetchMeetupById } from './meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  components: {
    UiAlert,
    UiContainer,
    MeetupView,
  },
  props: {
    meetupId: {
      type: Number,
      required: true,
    },
  },
  data: () => ({
    meetup: null,
    error: null,
  }),
  watch: {
    meetupId: {
      immediate: true,
      async handler(e) {
        this.meetup = null;
        this.error = null;
        try {
          this.meetup = await fetchMeetupById(e);
        } catch (error) {
          this.error = error.message;
        }
      },
    },
  },
  template: `
    <div class="page-meetup">
      <meetup-view v-if='meetup' :meetup="meetup"/>
      <ui-container v-else-if='!meetup && !error'>
        <ui-alert>Загрузка...</ui-alert>
      </ui-container>

      <ui-container v-else>
        <ui-alert>{{ error }}</ui-alert>
      </ui-container>
    </div>`,
});
