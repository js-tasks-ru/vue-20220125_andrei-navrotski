<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': loading }"
      :style="`--bg-url: url(${preview})`"
    >
      <span class="image-uploader__text">{{ text }}</span>
      <input
        v-bind="$attrs"
        ref="input"
        type="file"
        accept="image/*"
        class="image-uploader__input"
        @click="verifyPreview"
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
    loading: false,
  }),
  computed: {
    text() {
      if (this.loading) return 'Загрузка...';
      if (this.preview) return 'Удалить изображение';
      return 'Загрузить изображение ';
    },
  },
  methods: {
    verifyPreview(e) {
      if (this.preview) {
        e.preventDefault();
        this.deleteImage();
      }
    },
    async uploadFile() {
      let imageFile = this.$refs.input.files[0];
      this.$emit('select', imageFile);
      this.loading = true;
      try {
        let imageSrc = await this.uploader(imageFile);
        this.$emit('upload', imageSrc);
        this.loading = false;
      } catch (error) {
        this.deleteImage();
        this.loading = false;
        this.$emit('error', error);
      }
    },
    deleteImage() {
      this.$emit('upload', null);
      this.$refs.input.value = '';
      this.$emit('remove');
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
