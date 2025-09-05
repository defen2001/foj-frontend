<template>
  <div id="code-editor" ref="codeEditorRef" style="min-height: 400px"></div>
</template>
<script setup lang="ts">
import * as monaco from 'monaco-editor'
import {defineProps, onMounted, ref, toRaw, watch, withDefaults} from 'vue'

interface Props {
  value: string
  language: string
  handleChange: (v: string) => void
}

const props = withDefaults(defineProps<Props>(), {
  value: () => '',
  language: () => 'java',
  handleChange: (v: string) => {
    console.log(v)
  },
})
const codeEditorRef = ref()
const codeEditor = ref()

onMounted(() => {
  if (!codeEditorRef.value) {
    return
  }
  // Hover on each property to see its docs!
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: props.language,
    automaticLayout: true,
    minimap: {
      enabled: true,
    },
    // lineNumbers: "off",
    // roundedSelection: false,
    // scrollBeyondLastLine: false,
    readOnly: false,
    fontSize: 14,
    theme: 'vs-dark',
  })
  //编辑监听内容变化
  codeEditor.value.onDidChangeModelContent(() => {
    props.handleChange(toRaw(codeEditor.value).getValue())
  })
})

// 监听 language 属性，动态更改编辑器的语言
watch(
  () => props.language,
  () => {
    if (codeEditor.value) {
      monaco.editor.setModelLanguage(
        toRaw(codeEditor.value).getModel(),
        props.language
      );
    }
  }
);
</script>

<style scoped></style>
