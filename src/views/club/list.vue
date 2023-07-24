<template>
  <div class="wrapper__slot clubs">
    <Form class="clubs__search">
      <Input placeholder="Поиск" />
      <Button>
        <Icon icon="iconamoon:search-fill" />
      </Button>
    </Form>

    <Table
      :data="clubs"
      :fields="fields"
      :sort="sort"
      class="clubs__table"
      @sort="sortTable"
    >
      <template #club="{ item }">
        <RouterLink :to="`/club/${item.id}`">
          <Cell class="clubs__table__cell clubs__table__cell_club">
            <Avatar :src="item.avatar" />
            <pre>{{ item.name }}</pre>
          </Cell>
        </RouterLink>
      </template>

      <template #description="{ value }">
        <Cell class="clubs__table__cell clubs__table__cell_description">
          {{ value }}
        </Cell>
      </template>

      <template #leader="{ value }">
        <Cell class="clubs__table__cell clubs__table__cell_leader">
          <RouterLink :to="`/user/${value.id}`">
            <Tag :src="value.avatar" light>
              {{ value.slug }}
            </Tag>
          </RouterLink>
        </Cell>
      </template>

      <template #actions>
        <Cell class="clubs__table__cell clubs__table__cell_actions">
          <Button>Вступить</Button>
        </Cell>
      </template>
    </Table>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Constants
import { clubs } from "@/utils/constants";

// Components
import { Icon } from "@iconify/vue";
import Table from "@/components/Table/index.vue";
import Cell from "@/components/Table/cell.vue";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Avatar from "@/components/Avatar";
import Button from "@/components/Button";
import Tag from "@/components/Tag";

const sort = ref(null);
const fields = ref({
  club: {
    label: "Клуб",
    width: "max-content",
    sortable: true,
  },

  description: {
    label: "Описание",
    width: "minmax(20em, auto)",
    sortable: true,
  },

  leader: {
    label: "Глава",
  },

  members: {
    label: "Участники",
    width: "min-content",
  },

  actions: {
    label: "Действия",
  },
});

function sortTable(field, direction) {
  sort.value = { field, direction };
}
</script>

<style src="@/assets/css/pages/club/list.css" />
