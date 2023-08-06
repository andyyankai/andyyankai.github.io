<template>
  <header>
    <RouterLink class="title" to="/">{{ $config.title }}</RouterLink>
    <span class="subtitle">{{ $config.subtitle }}</span>
    <nav>
      <RouterLink v-for="menu in displayMenu" :key="menu.path" :to="menu.path">
        <i :class="['icon', `icon-${menu.icon}`]" />
        {{ menu.title }}
      </RouterLink>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    const { archiveOpts, categoryOpts, tagOpts, inspirationOpts, bookOpts, friendOpts, aboutOpts } = this.$config
    return {
      menu: [
        { path: '/home', display: false, icon: 'shop', title: 'Home' },
        { path: '/archive', display: archiveOpts.display, icon: 'inbox', title: '归档' },
        { path: '/category', display: categoryOpts.display, icon: 'bookmark-empty', title: '分类' },
        { path: '/tag', display: tagOpts.display, icon: 'tag', title: 'tag' },
        { path: '/publication', display: bookOpts.display, icon: 'pencil', title: 'Publication' },
        { path: '/inspiration', display: inspirationOpts.display, icon: 'comment', title: '灵感' },
        { path: '/friend', display: friendOpts.display, icon: 'heart', title: '友链' },
        { path: '/about', display: aboutOpts.display, icon: 'universal-access', title: 'About' },
      ],
    }
  },
  computed: {
    displayMenu() {
      return this.menu.filter((o) => o.display)
    },
  },
}
</script>

<style lang="scss" scope>
@import './index.scss';
</style>
