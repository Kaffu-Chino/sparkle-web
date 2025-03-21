<template>
  <el-card shadow="never" class="user-info-card">
    <el-space direction="vertical" alignment="start" :size="16">
      <el-space>
        <el-avatar shape="square" size="large" :src="props.user.avatar" />
        <el-space direction="vertical" alignment="start" :size="3">
          <el-space>
            <el-text size="large">{{ props.user.nickname }}</el-text>
            <el-tag v-if="props.user.banned === false" type="success">
              {{ t('clientDiscoveryView.userInfoCard.descriptions.items.userStatus.normal') }}
            </el-tag>
            <el-tag v-else-if="props.user.banned === true" type="danger">
              {{ t('clientDiscoveryView.userInfoCard.descriptions.items.userStatus.banned') }}
            </el-tag>
            <el-tag v-else type="info">
              {{ t('clientDiscoveryView.userInfoCard.descriptions.items.userStatus.unknown') }}
            </el-tag>
          </el-space>
          <el-text type="info">{{ `@` + props.user.id }}</el-text>
        </el-space>
      </el-space>
      <table class="descrpition-table">
        <tbody>
          <tr>
            <td class="discription-table_cell discription-table_label">
              {{ t('clientDiscoveryView.userInfoCard.descriptions.items.registerAt') }}
            </td>
            <td class="discription-table_cell">
              {{
                props.user.registerAt
                  ? dayjs(Number(props.user.registerAt) * 1000).format('YYYY-MM-DD HH:mm')
                  : t('global.value.empty')
              }}
            </td>
          </tr>
          <tr>
            <td class="discription-table_cell discription-table_label">
              {{ t('clientDiscoveryView.userInfoCard.descriptions.items.lastSeenAt') }}
            </td>
            <td class="discription-table_cell">
              {{
                props.user.lastSeenAt
                  ? dayjs(Number(props.user.lastSeenAt) * 1000).format('YYYY-MM-DD HH:mm')
                  : t('global.value.empty')
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </el-space>
  </el-card>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { dayjs } from 'element-plus'
import type { IUser } from '~/api/models/user'

const { t } = useI18n()
const props = defineProps<{
  user: IUser
}>()
</script>
<style lang="scss" scoped>
.user-info-card {
  max-width: 300px;
  border: unset;
  padding: 0px;
  background-color: transparent;
  .discription-table {
    padding: 8px 11px;
    &_label {
      font-weight: 700;
      color: var(--el-color-info);
    }
    &_cell {
      text-align: left;
      line-height: 23px;
      font-size: 14px;
    }
  }
}
</style>
