import {CACHE_KEY, useCache} from '@/hooks/web/useCache'
import {ElementPlusSize} from '@/types/elementPlus'
import {LayoutType} from '@/types/layout'
import {ThemeTypes} from '@/types/theme'
import {humpToUnderline, setCssVar} from '@/utils'
import {getCssColorVariable, hexToRGB, mix} from '@/utils/color'
import {ElMessage} from 'element-plus'
import {defineStore} from 'pinia'
import {store} from '../index'


const {wsCache} = useCache()

interface AppState {
    breadcrumb: boolean
    breadcrumbIcon: boolean
    collapse: boolean
    uniqueOpened: boolean
    hamburger: boolean
    screenfull: boolean
    search: boolean
    size: boolean
    locale: boolean
    message: boolean
    tagsView: boolean
    tagsViewImmerse: boolean
    tagsViewIcon: boolean
    logo: boolean
    fixedHeader: boolean
    greyMode: boolean
    pageLoading: boolean
    layout: LayoutType
    title: string
    userInfo: string
    isDark: boolean
    currentSize: ElementPlusSize
    sizeMap: ElementPlusSize[]
    mobile: boolean
    footer: boolean
    theme: ThemeTypes
    fixedMenu: boolean
}

export const useAppStore = defineStore('app', {
    state: (): AppState => {
        return {
            userInfo: 'userInfo', // 登录信息存储字段-建议每个项目换一个字段，避免与其他项目冲突
            sizeMap: ['default', 'large', 'small'],
            mobile: false, // 是否是移动端
            title: import.meta.env.VITE_APP_TITLE, // 标题
            pageLoading: false, // 路由跳转loading

            breadcrumb: true, // 面包屑
            breadcrumbIcon: true, // 面包屑图标
            collapse: false, // 折叠菜单
            uniqueOpened: true, // 是否只保持一个子菜单的展开
            hamburger: true, // 折叠图标
            screenfull: true, // 全屏图标
            search: true, // 搜索图标
            size: true, // 尺寸图标
            locale: true, // 多语言图标
            message: true, // 消息图标
            tagsView: true, // 标签页
            tagsViewImmerse: false, // 标签页沉浸
            tagsViewIcon: true, // 是否显示标签图标
            logo: true, // logo
            fixedHeader: true, // 固定toolheader
            footer: true, // 显示页脚
            greyMode: false, // 是否开始灰色模式，用于特殊悼念日
            fixedMenu: wsCache.get('fixedMenu') || false, // 是否固定菜单


            layout: wsCache.get(CACHE_KEY.LAYOUT) || 'classic', // layout布局
            isDark: wsCache.get(CACHE_KEY.IS_DARK) || false, // 是否是暗黑模式
            currentSize: wsCache.get('default') || 'default', // 组件尺寸
            theme: wsCache.get(CACHE_KEY.THEME) || {
                // 主题色
                elColorPrimary: '#409eff',
                // 左侧菜单边框颜色
                leftMenuBorderColor: 'inherit',
                // 左侧菜单背景颜色
                leftMenuBgColor: '#001529',
                // 左侧菜单浅色背景颜色
                leftMenuBgLightColor: '#0f2438',
                // 左侧菜单选中背景颜色
                leftMenuBgActiveColor: 'var(--el-color-primary)',
                // 左侧菜单收起选中背景颜色
                leftMenuCollapseBgActiveColor: 'var(--el-color-primary)',
                // 左侧菜单字体颜色
                leftMenuTextColor: '#bfcbd9',
                // 左侧菜单选中字体颜色
                leftMenuTextActiveColor: '#fff',
                // logo字体颜色
                logoTitleTextColor: '#fff',
                // logo边框颜色
                logoBorderColor: 'inherit',
                // 头部背景颜色
                topHeaderBgColor: '#fff',
                // 头部字体颜色
                topHeaderTextColor: 'inherit',
                // 头部悬停颜色
                topHeaderHoverColor: '#f6f6f6',
                // 头部边框颜色
                topToolBorderColor: '#eee'
            }
        }
    },
    getters: {
        getBreadcrumb(): boolean {
            return this.breadcrumb
        },
        getBreadcrumbIcon(): boolean {
            return this.breadcrumbIcon
        },
        getCollapse(): boolean {
            return this.collapse
        },
        getUniqueOpened(): boolean {
            return this.uniqueOpened
        },
        getHamburger(): boolean {
            return this.hamburger
        },
        getScreenfull(): boolean {
            return this.screenfull
        },
        getSize(): boolean {
            return this.size
        },
        getLocale(): boolean {
            return this.locale
        },
        getMessage(): boolean {
            return this.message
        },
        getTagsView(): boolean {
            return this.tagsView
        },
        getTagsViewImmerse(): boolean {
            return this.tagsViewImmerse
        },
        getTagsViewIcon(): boolean {
            return this.tagsViewIcon
        },
        getLogo(): boolean {
            return this.logo
        },
        getFixedHeader(): boolean {
            return this.fixedHeader
        },
        getGreyMode(): boolean {
            return this.greyMode
        },
        getFixedMenu(): boolean {
            return this.fixedMenu
        },
        getPageLoading(): boolean {
            return this.pageLoading
        },
        getLayout(): LayoutType {
            return this.layout
        },
        getTitle(): string {
            return this.title
        },
        getUserInfo(): string {
            return this.userInfo
        },
        getIsDark(): boolean {
            return this.isDark
        },
        getCurrentSize(): ElementPlusSize {
            return this.currentSize
        },
        getSizeMap(): ElementPlusSize[] {
            return this.sizeMap
        },
        getMobile(): boolean {
            return this.mobile
        },
        getTheme(): ThemeTypes {
            return this.theme
        },
        getFooter(): boolean {
            return this.footer
        }
    },
    actions: {
        setPrimaryLight() {
            if (this.theme.elColorPrimary) {
                const elColorPrimary = this.theme.elColorPrimary
                const color = this.isDark ? '#000000' : '#ffffff'
                const lightList = [3, 5, 7, 8, 9]
                lightList.forEach((v ) => {
                    setCssVar(`--el-color-primary-light-${v}`, mix(color, elColorPrimary, v / 10))
                })
            }
        }
    }
})