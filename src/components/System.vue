<style scoped>
h1 {
 color: red;
}
</style>
 
<template>
    <Tree :data="baseData" show-checkbox style="color:#fff"></Tree>
</template>
<script>
    export default {
        data () {
            return {
                baseData: [{
                    expand: true,
                    title: 'parent 1',
                    children: [{
                        title: 'parent 1-0',
                        expand: true,
                        
                        //disableCheckbox,
                        children: [{
                            title: 'leaf',
                        }, {
                            title: 'leaf',
                        }]
                    }, {
                        title: 'parent 1-1',
                        expand: true,
                        checked: true,
                        children: [{
                            title: '<span style="color: red">leaf</span>',
                        }]
                    }]
                }]
            }
        }
    }
</script>
