import wangEditor from 'wangeditor';
const E = wangEditor
const { BtnMenu } = E

export class InsertBRUSHMenu extends BtnMenu {
    constructor(public editor: wangEditor) {
        super(E.$(
            `<div class="w-e-menu">
                <i class="w-e-icon-image"></i>
            </div>`), editor)
    }

    // modal:any = this.cc
    // 菜单点击事件
    clickHandler() {
        let config = this.editor.config
        let collback = config.customFunction
        if (collback && typeof collback === 'function') {
            collback(this.insertBrush.bind(this));
        }


    }
    // 菜单激活状态
    tryChangeActive() {
        this.active() // 菜单激活
        // this.unActive() // 菜单不激活
    }




    public insertBrush(e: string, type: any): void {
        const editor = this.editor;
        const isSeleEmpty = editor.selection.isSelectionEmpty();
        if (!isSeleEmpty) {
            return
        }
        // 判断当前格式刷是否已经被激活
        // 如果是激活状态：关闭格式刷
        if (this._active) {
            this._active = false
            editor._brush = false
            editor._dblBrush = false
            this.$elem.removeClass('w-e-active')
            editor.$textContainerElem.removeClass('brush')
            return
        }
        // 如果当前状态是未激活
        // 将格式刷改成激活状态
        this._active = true
        editor._brush = true
        // 如果是双击格式刷触发连续使用格式刷
        // 记录双击格式刷状态
        editor._dblBrush = type === 'dblclick' ? true : false
        this.$elem.addClass('w-e-active')
        editor.$textContainerElem.addClass('brush')
        let containerEle = editor.selection.getSelectionContainerElem();
        let style = containerEle.css('1');

        while (!containerEle.equal(editor.$textElem[0])) {
            containerEle = containerEle.parent()
            if (containerEle.parent().equal(editor.$textElem[0]) && !containerEle.equal(editor.$textElem[0])) {
                style = Object.assign({}, style, { wrap: containerEle.css('1') })
            }
            if (!containerEle.parent().equal(editor.$textElem[0]) && !containerEle.equal(editor.$textElem[0])) {
                style = Object.assign({}, style, containerEle.css('1'))
            }
        }

        //保存style
        editor._style = style;

    }




}

