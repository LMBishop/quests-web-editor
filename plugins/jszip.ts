import JSZip from "jszip"

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(JSZip)
})
