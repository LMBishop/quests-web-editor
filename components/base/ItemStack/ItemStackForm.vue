<script setup lang="ts">
import { computed } from 'vue';
import { parse, stringify } from 'yaml';
import materials from '@/lib/materials';
import enchantments from '@/lib/enchantments';
import itemflags from '@/lib/itemflags';

const model = defineModel<any>();

if (typeof model.value !== 'object' || model.value === null) {
  model.value = {};
}

const editAsYaml = ref(false);
const yamlCode = ref('');

const switchToYamlEditor = () => {
  yamlCode.value = stringify({
    type: model.value.type || model.value.material || model.value.item || "",
    ...("name" in model.value && { name: model.value.name }),
    ...("lore" in model.value && { lore: model.value.lore }),
    ...("enchantments" in model.value && { enchantments: model.value.enchantments }),
    ...("itemflags" in model.value && { itemflags: model.value.itemflags }),
    ...("custommodeldata" in model.value && { custommodeldata: model.value.custommodeldata }),
    ...("unbreakable" in model.value && { unbreakable: model.value.unbreakable }),
    ...("attributemodifiers" in model.value && { attributemodifiers: model.value.attributemodifiers }),
    ...("owner-base64" in model.value && { ["owner-base64"]: model.value["owner-base64"] }),
    ...("owner-username" in model.value && { ["owner-username"]: model.value["owner-username"] }),
    ...("owner-uuid" in model.value && { ["owner-uuid"]: model.value["owner-uuid"] })
  })
  editAsYaml.value = true;
}

const switchToGuiEditor = () => {
  parseAndSetYamlValues();
  editAsYaml.value = false;
}

const parseAndSetYamlValues = (): boolean => {
  let newValues;
  try {
    newValues = parse(yamlCode.value);
  } catch (e) {
    return false;
  }

  model.value.type = newValues.type;
  if ("name" in newValues) model.value.name = String(newValues.name);
  if ("lore" in newValues) model.value.lore = Array.isArray(newValues.lore) ? newValues.lore : [newValues.lore];
  if ("enchantments" in newValues) model.value.enchantments = Array.isArray(newValues.enchantments) ? newValues.enchantments : [newValues.enchantments];
  if ("itemflags" in newValues) model.value.itemflags = Array.isArray(newValues.itemflags) ? newValues.itemflags : [newValues.itemflags];
  if ("custommodeldata" in newValues) model.value.custommodeldata = Number(newValues.custommodeldata) || 0;
  if ("unbreakable" in newValues) model.value.unbreakable = !!newValues.unbreakable;
  if ("attributemodifiers" in newValues) model.value.attributemodifiers = Array.isArray(newValues.attributemodifiers) ? newValues.attributemodifiers : [newValues.attributemodifiers];
  if ("owner-base64" in newValues) model.value["owner-base64"] = String(newValues["owner-base64"]);
  if ("owner-username" in newValues) model.value["owner-username"] = String(newValues["owner-username"]);
  if ("owner-uuid" in newValues) model.value["owner-uuid"] = String(newValues["owner-uuid"]);

  return true;
}

const itemName = computed({
  get() {
    return model.value.name;
  },
  set(newValue: string) {
    model.value.name = newValue;
  },
});

const isOptionSet = (option: string) => {
  return option in model.value;
}

const setOption = (option: string, type: 'string' | 'string-list' | 'number' | 'boolean') => {
  switch (type) {
    case 'string':
      model.value[option] = '';
      break;
    case 'number':
      model.value[option] = 0;
      break;
    case 'boolean':
      model.value[option] = false;
      break;
    case 'string-list':
      model.value[option] = [];
      break;
  }
}

const removeOption = (option: string) => {
  delete model.value[option];
}

const itemType = computed({
  get() {
    return model.value.type || model.value.material || model.value.item;
  },
  set(newValue: string) {
    if (model.value.material) {
      model.value.material = newValue;
    } else if (model.value.item) {
      model.value.item = newValue;
    } else {
      model.value.type = newValue;
    }
  },
});

const itemLore = computed({
  get() {
    return model.value.lore?.join('\n');
  },
  set(newValue: string) {
    model.value.lore = newValue.split('\n');
  }
})

const itemEnchantments = computed({
  get() {
    return model.value.enchantments;
  },
  set(newValue: any) {
    model.value.enchantments = newValue;
  }
})

const itemCustomModelData = computed({
  get() {
    return model.value.custommodeldata;
  },
  set(newValue: any) {
    model.value.custommodeldata = newValue;
  }
})

const itemItemflags = computed({
  get() {
    return model.value.itemflags;
  },
  set(newValue: any) {
    model.value.itemflags = newValue;
  }
})
</script>

<template>
  <div id="gui-form" v-if="!editAsYaml">
    <div class="option-group">
      <div class="label-with-button">
        <label for="itemstack-type">Type</label>

        <Button label="Edit as YAML" :icon="['fas', 'pencil']" @click="switchToYamlEditor()"></Button>
      </div>
      <multiselect v-model="itemType" :options="materials" :searchable="true" placeholder="Choose a material" />
    </div>

    <div class="option-group" v-if="isOptionSet('name')">
      <ItemStackFormOptionLabel option="name" type="string" label="Name" :is-option-set-fn="isOptionSet"
        :set-option-fn="setOption" :remove-option-fn="removeOption" />

      <input id="itemstack-name" name="itemstack-name" v-model="itemName" placeholder="Enter display name" />
    </div>

    <div class="option-group" v-if="isOptionSet('lore')">
      <ItemStackFormOptionLabel option="lore" type="string-list" label="Lore" :is-option-set-fn="isOptionSet"
        :set-option-fn="setOption" :remove-option-fn="removeOption" />

      <textarea rows="5" id="itemstack-lore" name="itemstack-lore" v-model="itemLore" placeholder="Enter item lore" />
    </div>

    <div class="option-group" v-if="isOptionSet('enchantments')">
      <ItemStackFormOptionLabel option="enchantments" type="string-list" label="Enchantments"
        :is-option-set-fn="isOptionSet" :set-option-fn="setOption" :remove-option-fn="removeOption" />

      <multiselect v-model="itemEnchantments" :options="enchantments" :searchable="true" :multiple="true"
        placeholder="Enter enchantment names" />
    </div>

    <div class="option-group" v-if="isOptionSet('itemflags')">
      <ItemStackFormOptionLabel option="itemflags" type="string-list" label="Item flags" :is-option-set-fn="isOptionSet"
        :set-option-fn="setOption" :remove-option-fn="removeOption" />

      <multiselect v-model="itemItemflags" :options="itemflags" :searchable="true" :multiple="true"
        placeholder="Enter item flags" />
    </div>

    <div class="option-group" v-if="isOptionSet('custommodeldata')">
      <ItemStackFormOptionLabel option="custommodeldata" type="number" label="Custom model data"
        :is-option-set-fn="isOptionSet" :set-option-fn="setOption" :remove-option-fn="removeOption" />

      <input id="itemstack-custommodeldata" name="itemstack-custommodeldata" v-model="itemCustomModelData" type="number"
        placeholder="Enter custom model data" />
    </div>

    <div>
      <Button v-if="!isOptionSet('name')" @click="setOption('name', 'string')" label="Add specific name"
        :icon="['fas', 'plus']"></Button>
      <Button v-if="!isOptionSet('lore')" @click="setOption('lore', 'string-list')" label="Add specific lore"
        :icon="['fas', 'plus']"></Button>
      <Button v-if="!isOptionSet('enchantments')" @click="setOption('enchantments', 'string-list')"
        label="Add specific enchantments" :icon="['fas', 'plus']"></Button>
      <Button v-if="!isOptionSet('itemflags')" @click="setOption('itemflags', 'string-list')"
        label="Add specific item flags" :icon="['fas', 'plus']"></Button>
      <Button v-if="!isOptionSet('custommodeldata')" @click="setOption('custommodeldata', 'string')"
        label="Add specific custom model data" :icon="['fas', 'plus']"></Button>
    </div>

    <p>For
      <NuxtLink to="https://quests.leonardobishop.com/configuration/defining-items.html#unbreakable">
        unbreakable</NuxtLink>,
      <NuxtLink to="https://quests.leonardobishop.com/configuration/defining-items.html#attribute-modifiers">
        attribute-modifiers</NuxtLink>, and
      <NuxtLink to="https://quests.leonardobishop.com/configuration/defining-items.html#owner">owner</NuxtLink> please
      switch to YAML.
    </p>
  </div>

  <div id="yaml-form" v-if="editAsYaml">
    <div class="option-group">
      <div class="label-with-button">
        <label for="itemstack-name">YAML</label>

        <Button label="Use GUI editor" :icon="['fas', 'pencil']" @click="switchToGuiEditor"></Button>
      </div>

      <textarea id="yaml-editor" rows="10" v-model="yamlCode"></textarea>
    </div>
  </div>
</template>

<style>
#gui-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.label-with-button {
  display: flex;
  justify-content: space-between;
}

#yaml-editor {
  font-family: monospace;
}
</style>