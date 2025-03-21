<template>
  <el-descriptions size="large" :column="responsiveColumn">
    <template #title>
      <el-space fill style="display: flex; justify-content: space-between">
        <el-space wrap>
          <el-space>
            <el-text size="large" tag="b">
              {{ props.item.clientName ? props.item.clientName : t('global.value.empty') }}
            </el-text>
            <el-tooltip :content="t('global.copy')" placement="top">
              <el-button
                class="copy-button"
                type="info"
                :disabled="props.item.clientName ? false : true"
                @click="copyContent(props.item.clientName)"
                :icon="ElCopyDocument"
                text
                circle
              />
            </el-tooltip>
          </el-space>
          <el-tag type="info" class="peerId-info-tag">
            {{ props.item.peerId ? props.item.peerId : t('global.value.empty') }}
            <el-tooltip :content="t('global.copy')" placement="top">
              <el-button
                class="copy-button"
                type="info"
                size="small"
                :disabled="props.item.peerId ? false : true"
                @click="copyContent(props.item.peerId)"
                :icon="ElCopyDocument"
                link
              />
            </el-tooltip>
          </el-tag>
        </el-space>
      </el-space>
    </template>
    <el-descriptions-item
      :span="2"
      label-width="80px"
      label-class-name="descriptions-label"
      :label="t('clientDiscoveryView.clientListItem.descriptions.items.hash')"
    >
      {{ props.item.hash }}
    </el-descriptions-item>
    <el-descriptions-item
      :span="1"
      label-width="80px"
      label-class-name="descriptions-label"
      :label="t('clientDiscoveryView.clientListItem.descriptions.items.firstFound')"
    >
      <el-space wrap>
        {{
          props.item.foundAt
            ? dayjs(Number(props.item.foundAt) * 1000).format('YYYY-MM-DD HH:mm:ss')
            : t('global.value.empty')
        }}
        <el-popover v-if="props.item.foundBy" :width="300" popper-class="user-info-popper">
          <template #reference>
            <el-space>
              <el-avatar size="small" shape="square" :src="props.item.foundBy.avatar" />
              <el-text>{{ props.item.foundBy.nickname }}</el-text>
            </el-space>
          </template>
          <template #default>
            <userInfoCard :user="props.item.foundBy"></userInfoCard>
          </template>
        </el-popover>
      </el-space>
    </el-descriptions-item>
    <el-descriptions-item
      :span="1"
      label-width="80px"
      label-class-name="descriptions-label"
      :label="t('clientDiscoveryView.clientListItem.descriptions.items.lastFound')"
    >
      <el-space wrap>
        {{
          props.item.lastSeenAt
            ? dayjs(Number(props.item.lastSeenAt) * 1000).format('YYYY-MM-DD HH:mm:ss')
            : t('global.value.empty')
        }}
        <el-popover v-if="props.item.lastSeenBy" :width="300" popper-class="user-info-popper">
          <template #reference>
            <el-space>
              <el-avatar size="small" shape="square" :src="props.item.lastSeenBy.avatar" />
              <el-text>{{ props.item.lastSeenBy.nickname }}</el-text>
            </el-space>
          </template>
          <template #default>
            <userInfoCard :user="props.item.lastSeenBy"></userInfoCard>
          </template>
        </el-popover>
      </el-space>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { dayjs } from 'element-plus'
import { CopyDocument as ElCopyDocument } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import userInfoCard from './userInfoCard.vue'
import type { IClientDiscovery } from '~/api/models/clientDiscovery'
import clipboardCopy from 'clipboard-copy'

const { t } = useI18n()
const { width } = useWindowSize()

const responsiveColumn = computed(() => {
  console.log(width.value)
  if (width.value < 768) return 1
  if (width.value < 1920) return 2
  return 4
})

const props = defineProps<{
  item: IClientDiscovery
}>()

const copyContent = async (content: string) => {
  try {
    await clipboardCopy(content)
    ElMessage.success(t('global.messages.copySuccess'))
  } catch (e) {
    ElNotification.error({
      title: t('global.messages.copyError'),
      message: String(e)
    })
  }
}
</script>
<style lang="scss" scoped>
:deep(.descriptions-label) {
  color: var(--el-color-info);
}
:deep(.user-info-popper) {
  padding: '0px';
}
</style>
