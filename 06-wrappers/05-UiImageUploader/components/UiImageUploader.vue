<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': state === 'loading' }"
      :style="`--bg-url: url(${preview})`"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @click="handleClick"
        @change="uploadFile"
      />
    </label>
  </div>
</template>

<script>
export default {
  name: 'UiImageUploader',
  inheritAttrs: false,
  props: {
    preview: String,
    uploader: Function,
  },
  emits: ['remove', 'upload', 'error', 'select'],
  data: () => ({
    selectedSrc: undefined,
    state: undefined,
  }),
  computed: {
    text() {
      return {
        empty: 'Загрузить изображение',
        loading: 'Загрузка...',
        filled: 'Удалить изображение',
      }[this.state];
    },
    localSrc() {
      return this.selectedSrc || this.preview;
    },
  },
  created() {
    this.state = this.preview ? 'filled' : 'empty';
  },
  methods: {
    handleClick(e) {
      if (this.state === 'loading') {
        e.preventDefault();
      } else if (this.state === 'filled') {
        e.preventDefault();
        this.deleteImage();
        this.state = 'empty';
        this.$emit('remove');
      }
    },
    async uploadFile() {
      let imageFile = this.$refs.input.files[0];
      this.localSrc = URL.createObjectURL(imageFile);
      this.$emit('select', imageFile);
      if (!this.uploader) {
        this.state = 'filled';
        return;
      }
      this.state = 'loading';
      try {
        let imageSrc = await this.uploader(imageFile);
        this.state = 'filled';
        this.$emit('upload', imageSrc);
      } catch (error) {
        this.state = 'empty';
        this.deleteImage();
        this.$emit('error', error);
      }
      this.selectedSrc = undefined;
    },
    deleteImage() {
      this.$refs.input.value = '';
    },
  },
};
</script>

<style scoped>
.image-uploader {
}

.image-uploader__input {
  opacity: 0;
  height: 0;
}

.image-uploader__preview {
  --bg-url: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-url);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader__text {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
