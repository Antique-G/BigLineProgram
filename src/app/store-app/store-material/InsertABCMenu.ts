import wangEditor from 'wangeditor';
const E = wangEditor
const { BtnMenu } = E

export class InsertABCMenu extends BtnMenu   {
    constructor(public editor:wangEditor) {
        super(E.$(
            `<div class="w-e-menu">
                <i class="w-e-icon-image" title='插入图片'></i>
            </div>`),editor)
    }

    // modal:any = this.cc
    // 菜单点击事件
    clickHandler() {
        let config = this.editor.config
        let collback = config.customFunction
        if (collback && typeof collback === 'function') {
            collback(this.insertImg.bind(this));
        }
   
         
    }
    // 菜单激活状态
    tryChangeActive() {
        this.active() // 菜单激活
        // this.unActive() // 菜单不激活
    }
    public insertImg(src: string): void {
        const editor = this.editor
        const config = editor.config

        const i18nPrefix = 'validate.'
        const t = (text: string, prefix: string = i18nPrefix): string => {
            return editor.i18next.t(prefix + text)
        }

        // 先插入图片，无论是否能成功
        editor.cmd.do('insertHTML', `<img src="${src}" style="max-width:100%;"/>`)
        // 执行回调函数
        config.linkImgCallback(src)

        // 加载图片
        let img: any = document.createElement('img')
        img.onload = () => {
            img = null
        }
        img.onerror = () => {
            config.customAlert(
                t('插入图片错误'),
                'error',
                `wangEditor: ${t('插入图片错误')}，${t('图片链接')} "${src}"，${t('下载链接失败')}`
            )
            img = null
        }
        img.onabort = () => (img = null)
        img.src = src
    }
   
}

