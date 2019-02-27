<style scoped>
@import '../scss/Layout.scss';
</style>


<template>
  <section class="admin-layout-container">
      <div class="layout">
        <Layout>
            <Sider ref="sidebar" class="sidebar" hide-trigger collapsible width="230" :collapsed-width="78" v-model.trim="isCollapsed">
                <div class="logo" >
                    <div class="xfind-line" v-if="!isCollapsed">
                        <div class="line-h"></div>
                    </div>
                    <!-- 左边logo -->
                    <div v-if="!isCollapsed" class="logo-saiqu">
                        <!-- <Avatar icon="ios-person" size="large"/>     -->
                        <!-- <span class="user-name">Admin</span> -->
                        <img src="@/assets/logo1.png" alt="加载失败" title="图南电子股份有限公司" style="width:100px;height:40px;margin-left:10px;">
                    </div>
                    <img src="@/assets/logo1.png" alt="加载失败" title="图南电子股份有限公司" style="width:60px;height:30px;" v-else>
                    <!-- <Avatar icon="ios-person" size="large" v-else/> -->
                </div>
                <Menu
                    ref="side_menu"
                    :active-name="activeMenuName"
                    :open-names="openMenuName"
                    theme="dark"
                    width="230px"
                    :class="menuitemClasses"
                    @on-select="choosedMenu"
                    v-if="!isCollapsed">
                    <template v-for="(menu,menu_index) in menus">
                        <Submenu :name="menu.name" v-if="menu.children" :key="menu_index">
                            <template slot="title">
                                <Icon :size="20" :type="menu.icon"></Icon>
                                <span>{{menu.title}}</span>
                            </template>
                            <MenuItem :name="child.name" v-for="(child ,child_index) in menu.children" :key="child_index">
                                <Icon :size="20" :type="child.icon"></Icon>
                                <span>{{child.title}}</span>
                            </MenuItem>
                        </Submenu>
                        <MenuItem :name="menu.name" v-if="!menu.children && menu.showInMenus" :key="menu_index">
                            <Icon :size="20" :type="menu.icon" :key="menu_index"></Icon>
                            <span>{{menu.title}}</span>
                        </MenuItem>
                    </template>
                </Menu>
                <div class="dropdown-wrap"  v-if="isCollapsed">
                    <div class="dw-content">
                        <template v-for="(menu,menu_index) in menus">
                            <Dropdown transfer placement="right-start" v-if="menu.children" @on-click="dropdownClick" :key="menu_index">
                                <Button class="dd-btn" type="text">
                                    <Icon :size="25" :type="menu.icon"></Icon>
                                </Button>
                                <DropdownMenu class="dd-menu" slot="list">
                                    <template v-for="(child, i) in menu.children">
                                        <DropdownItem :name="child.name" :key="i">
                                            <div class="ddi-wapper">
                                                <Icon :size="16" :type="child.icon"></Icon>
                                                <span class="ddi-text">
                                                    {{ child.title }}
                                                </span>
                                            </div>
                                        </DropdownItem>
                                    </template>
                                </DropdownMenu>
                            </Dropdown>
                            <Dropdown transfer v-if="!menu.children && menu.showInMenus" placement="right-start" @on-click="dropdownClick" :key="menu_index">
                                <Button class="dd-btn" type="text">
                                    <Icon :size="25" :type="menu.icon"></Icon>
                                </Button>
                                <DropdownMenu class="dd-menu" slot="list">
                                    <DropdownItem :name="menu.name">
                                        <div class="ddi-wapper">
                                            <Icon :size="16" :type="menu.icon"></Icon>
                                            <span class="ddi-text">
                                                {{ menu.title }}
                                            </span>
                                        </div>
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </template>
                    </div>
                </div>
            </Sider>
            <Layout>
                <!-- :style="{width: isCollapsed?'calc(100% - 78px)':'calc(100% - 230px)'}" -->
                <Header class="layout-header-bar">
                    <div class="header-wapper">
                        <div class="header-left">
                            <Icon @click.native="collapsedSider" :class="rotateIcon" type="md-menu" size="28"></Icon>
                            <span class="header-title">短信应急广播平台</span>
                        </div>
                        <div class="header-right" style="margin-right:20px">
                            <Avatar icon="ios-person" size="large" style="margin-right:10px;"/>
                            <span class="user-name">{{username}}</span>
                            <Button type="text" class="btn-blue" icon="person" size="large" @click="personalSet">个人设置</Button>
                            <!-- <Button type="text" icon="android-notifications" size="large" @click="clickNotice">消息通知</Button>
                            <Dropdown style="margin-left:10px">
                                <a href="javascript:void(0)">
                                    下拉菜单
                                    <Icon type="ios-arrow-down"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem>个人设置</DropdownItem>
                                    <DropdownItem>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown> -->
                            <Button type="text" icon="md-exit" class="btn-blue" size="large" @click="quit">退出系统</Button>
                        </div>
                    </div>
                </Header>
                 <!-- :style="{width:isCollapsed?'calc(100% - 78px)':'calc(100% - 230px)'}" -->
                <Content class="main-content">
                    <Layout class="main-layout-con">
                        <div class="tags-nav-wapper">
                            <div class="tags-nav">
                                <div class="btn-con left-btn">
                                    <Button type="text" @click="handleScroll(240)">
                                        <Icon :size="18" type="ios-arrow-back" />
                                    </Button>
                                </div>
                                <div ref="scrollOuter" class="scroll-outer" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
                                    <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
                                        <transition-group name="taglist-moving-animation">
                                            <Tag type="dot"
                                                v-for="tab in tags"
                                                :closable="tab.closable"
                                                :color="tab.choosed? 'primary':'#e9eaec'"
                                                :name="tab.name"
                                                @click.native="clickTag(tab)"
                                                @on-close="closeTag"
                                                :key="tab.name">
                                                    {{tab.title}}
                                                </Tag>
                                        </transition-group>
                                    </div>
                                </div>
                                <div class="btn-con right-btn">
                                    <Button type="text" @click="handleScroll(-240)">
                                        <Icon :size="18" type="ios-arrow-forward" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <Content class="content-wrapper">
                            <!-- <Spin size="large" fix v-if="spinShow">
                                <Circle2 />
                            </Spin> -->
                            <!--保存组件状态到内存，避免重新渲染-->
                            <keep-alive>
                                <router-view/>
                            </keep-alive>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        </Layout>
    </div>
  </section>
</template>
<script>
export default {
    data(){
        return{
            isCollapsed: false,
            // ------------------------------  菜单操作开始  --------------------------------
            title:'首页1',
            activeMenuName:'admin1',
            openMenuName:[],

            tagBodyLeft: 0,
            rightOffset: 40,
            outerPadding: 4,
            contextMenuLeft: 0,
            contextMenuTop: 0,
            visible: false,

            pers:{choosed: false,name:'personalSet',href: "/personalSet",closable: true,showInTags: false,choosed:false,title:"个人设置"},

            menus:[
                {
                    title:'首页',
                    num:1,
                    name:'admin',
                    icon:'ios-home',
                    href:'/home',
                    closable:false,
                    showInTags:true,
                    showInMenus:true,
                    choosed:true
                },
                {
                    title:'短信管理',
                    name:'members',
                    icon:'ios-people',
                    children:[
                        {
                            title:'信息编辑',
                            name:'MemberManage',
                            href:'/about',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                        {
                            title:'信息调度',
                            name:'MemberLevels',
                            href:'/levels',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                    ]
                },
                {
                    title:'资源管理',
                    name:'resourceManagement-manage',
                    icon:'ios-cog',
                    children:[
                        {
                            title:'资源管理',
                            name:'resourceManagement',
                            href:'/resourceManagement',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                    ]

                },
                {
                    title:'播放记录',
                    name:'Playback-record',
                    icon:'ios-cash',
                    children:[
                        {
                            title:'播放记录',
                            name:'Record',
                            href:'/record',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                    ]
                },
                {
                    title:'报表统计',
                    name:'report-manage',
                    icon:'ios-stats',
                    children:[
                       {
                            title:'报表统计',
                            name:'Report',
                            href:'/report',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                    ]
                },
                {
                    title:'系统配置',
                    name:'frontend-setting',
                    icon:'logo-html5',
                    children:[
                        {
                            title:'账号管理',
                            name:'account-management',
                            href:'/account',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },

                        {
                            title:'角色管理',
                            name:'Role-management',
                            href:'/role',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        },
                        {
                            title:'敏感词管理',
                            name:'Sensitive-Management',
                            href:'/sensitive',
                            closable:true,
                            showInTags:false,
                            showInMenus:true,
                            choosed:false
                        }
                    ]
                },
            ]
            // ------------------------------  菜单操作结束  --------------------------------
        }
    },
    computed: {
        username(){
            console.log(this.$store.getters)
             return this.$store.getters.userName.username;
         },
        // 筛选menus中选中的menu
        tags(){
            let tags = [];
            // 将menus中showInTags=true的标签放到tags数组中
            this.menus.forEach(menu=>{
                if(menu.showInTags){
                    tags.push(menu);
                }else if(menu.children){
                    menu.children.forEach(child=>{
                        if(child.showInTags){
                            tags.push(child)
                        }
                    })
                }
            });
            if(this.pers.showInTags){
                        tags.push(this.pers)
                }
            //标签数组排序，从小到到
            tags.sort((a,b)=>{
                return (a.num - b.num)
            })
            return tags;
        },
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        }
    },
    // ------------------------------  菜单操作开始  --------------------------------
    //刷新页面之后保存并选中最后一次菜单和标签
    beforeRouteEnter (to, from, next) {
        next(vm => {
            // 通过 `vm` 访问组件实例
            let activeMenuName = localStorage.activeMenuName;
            vm.activeMenuName = activeMenuName;
            let tags_last_num = vm.tags[vm.tags.length - 1].num;

            if(activeMenuName && activeMenuName.length != 0){
                vm.menus.forEach(_menu=>{
                    if(activeMenuName == _menu.name){
                        _menu.choosed = true;
                        _menu.showInTags = true;
                        _menu.num = tags_last_num + 1;
                    }
                    else if(_menu.children){
                        _menu.children.forEach(child=>{
                            if(activeMenuName == child.name){
                                child.choosed = true;
                                child.showInTags = true;
                                child.num = tags_last_num + 1;
                                vm.openMenuName = [_menu.name];
                            }
                        })
                    }else if(activeMenuName==vm.pers.name){
                        vm.pers.choosed = true;
                        vm.pers.showInTags = true;
                        vm.pers.num = tags_last_num + 1;
                        _menu.choosed = false;
                    }
                    else{
                        // 排除首页
                        if(_menu.name != 'admin'){
                            _menu.choosed = false;
                            _menu.showInTags = false;
                        }else{
                            _menu.choosed = false;
                        }
                    }
                })
            }
            vm.$nextTick(()=>{
                // console.log(vm.$refs.side_menu, 22)
                // vm.$refs.side_menu.updateOpened();
                // vm.$refs.side_menu.updateActiveName();
            });
        })
    },
    // ------------------------------  菜单操作结束  --------------------------------
    methods: {
        personalSet(){
            // this.tags.push(this.pers)
            this.choosedMenu(this.pers.name)
            this.clickTag(this.pers)
            this.pers.showInTags=true;
            this.$router.push('/personalSet')
        },
        /*tags 滚动事件 */
        handlescroll (e) {
            var type = e.type
            let delta = 0
            if (type === 'DOMMouseScroll' || type === 'mousewheel') {
                delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
            }
            this.handleScroll(delta)
        },
        /*tags 滑动事件 */
        handleScroll (offset) {
            const outerWidth = this.$refs.scrollOuter.offsetWidth
            const bodyWidth = this.$refs.scrollBody.offsetWidth
            if (offset > 0) {
                this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
            } else {
                if (outerWidth < bodyWidth) {
                    if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
                        this.tagBodyLeft = this.tagBodyLeft
                    } else {
                        this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
                    }
                } else {
                    this.tagBodyLeft = 0
                }
            }
        },

        /* 右边导航栏 */
        quit(){
            if(window.confirm('你确定要退出吗？')){
                 this.$router.push('/login')
                 //return true;
              }else{
                 return false;
             }

        },
        clickNotice(){
            this.choosedMenu('notice');
        },
        collapsedSider() {
            this.$refs.sidebar.toggleCollapse();
        },
        // ------------------------------  菜单操作开始  --------------------------------
        closeTag(event, name){
            // 判断该标签是否是选中状态
            // 如果是那么就要设置标签数组中最后一个标签成选中状态
            // 如果否那么就直接删除就好
            let is_choosed = false;
            this.menus.forEach((menu)=>{
                if(menu.name == name){
                    is_choosed = menu.choosed;
                    menu.showInTags = false;
                }else if(menu.children){
                    menu.children.forEach(child=>{
                        if(child.name == name){
                            is_choosed = child.choosed;
                            child.showInTags = false;
                        }
                    })
                }else if(name=="personalSet"){
                    is_choosed = this.pers.choosed;
                    this.pers.showInTags = false;
                }
            })
            // 关闭标签并选中tags中最后一个标签高亮
            if(is_choosed){
                let last_tag = this.tags[this.tags.length-1];
                last_tag.choosed = true;
                this.$router.push(last_tag.href);
                this.activeMenuName = last_tag.name;
                localStorage.activeMenuName = this.activeMenuName;
            }
        },
        clickTag(tag){
            this.tags.forEach(_tag=>{
                if(_tag.name == tag.name){
                    _tag.choosed=true;
                    this.pers.choosed=false;
                }else{
                    _tag.choosed= false;
                    this.pers.choosed=false;
                }
            })
            if(this.pers.name==tag.name){
                this.pers.choosed=true
            }else{
                this.pers.choosed=false
            }

            // 设置菜单选中name
            this.activeMenuName = tag.name;
            localStorage.activeMenuName = this.activeMenuName;
            // 刷新菜单
            this.$nextTick(()=>{
                if(this.$refs.side_menu){
                    this.$refs.side_menu.updateActiveName()
                }
            });
            //点击tab跳转
            this.$router.push(`${tag.href}`);
        },
        choosedMenu(name){
            // 获取标签数组最后一个元素的num
            let tags_last_num = this.tags[this.tags.length - 1].num;
            // 设置选中菜单name
            this.activeMenuName = name;
            localStorage.activeMenuName = this.activeMenuName;
            //根据name查找对应的菜单对象
            let menu = null;
            this.menus.forEach(_menu=>{
                if(_menu.name == name){
                    // 只有不在tags数组中的元素才能设置num
                    if(!_menu.showInTags){
                        _menu.num = tags_last_num + 1;
                    }
                    menu = _menu;
                    _menu.showInTags = true;
                    _menu.choosed = true;
                    this.pers.choosed=false;

                }
                else if(_menu.children){
                    _menu.children.forEach(child=>{
                        if(child.name == name){
                            // 只有不在tags数组中的元素才能设置num
                            if(!_menu.showInTags){
                                child.num = tags_last_num + 1;
                            }
                            menu = child;
                            child.showInTags = true;
                            child.choosed = true;
                            this.pers.choosed=false;
                        }else{
                            child.choosed = false;
                        }
                    })
                }
                else {
                    _menu.choosed = false;
                }
            })
            // if(this.pers.name=name){
            //     if(!this.pers.showInTags){
            //             this.pers.num = tags_last_num + 1;
            //         }
            //         this.pers.showInTags = true;
            // }
            if(menu==null){
                this.$router.push(`${this.pers.href}`);
            }else{
                this.$router.push(`${menu.href}`);
            }
        },
        dropdownClick(name){
            this.choosedMenu(name);
        }
        // ------------------------------  菜单操作结束  --------------------------------
    }
}
</script>
