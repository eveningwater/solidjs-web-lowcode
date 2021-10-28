/**
 * Simple realization of adsorption effect
 */

let lines = {
    xt:null, //the top of x
    xc:null,//the center of x
    xb:null,//the bottom of x
    yl:null,//the left of y
    yc:null,//the center of y
    yr:null //the right of y
}
interface OptionType {
    gap:number;
    [key:string]:any;
}
interface FunctionType {
    show:Function;
    hide:Function;
}
interface ConditionItemType {
    isNear:boolean;
    lineNode:NodeType;
    lineValue:number;
    dragValue:number;
}
interface ConditionType {
    top:Array<ConditionItemType>;
    left:Array<ConditionItemType>;
}
type NodeType = HTMLElement | Element;
interface LineNodeType extends HTMLDivElement,FunctionType {}
export class RefLine {
    options:OptionType;
    constructor(options = {}){
        this.options = {
            ...{ gap:6 }, //the spacing about Adsorption
            ...options
        }
        this.initLines(this.options?.container);
    }
    /**
     *  init the lines
     * @param container 
     */
    initLines(container:NodeType = document.body){
        for(let l in lines){
            let node = lines[l] = <LineNodeType>document.createElement("div");
            node.classList.add("ref-line",l);
            // the style of line
            node.style.cssText += `
                display: none;
                opacity: 0.7;
                position: absolute;
                background: #535455;
                z-index: 99999;
                ${l[0] === 'x' ? 'width: 100%; height: 1px; left: 0' : 'width: 1px; height: 100%; top: 0px'}
            `;
            node.show = () => {
                node.style.display = "block";
            }
            node.hide = () => {
                node.style.display = "none";
            }
            container.appendChild(node);
        }
    }
    checkNearNode(dragging:NodeType,otherNodes:Array<NodeType>,parentNode:NodeType = document.body){
        // the rect of dragging element and the rect of parentNode
        let dragRect = dragging.getBoundingClientRect(),
            parentRect = parentNode.getBoundingClientRect();
        this.uncheckNearNode();
        otherNodes.forEach(node => {
            node.classList.remove("ref-line-active");
            // Exclude yourself
            if(dragging === node){
                return;
            }
            // get all property in rect Object
            let { top,right,left,height,width,bottom } = node.getBoundingClientRect();
            let dragHalfWidth = dragRect.width / 2,
                dragHalfHeight = dragRect.height / 2,
                nodeHalfWidth = width / 2,
                nodeHalfHeight = height / 2;
            
            let conditions:ConditionType = {
                //Divided into 5 situations
                top:[
                    // xt-top
                    {
                      isNear: this.isNear(dragRect.top, top),
                      lineNode: lines.xt,
                      lineValue: top,
                      dragValue: top
                    },
                    // xt-bottom
                    {
                      isNear: this.isNear(dragRect.bottom, top),
                      lineNode: lines.xt,
                      lineValue: top,
                      dragValue: top - dragRect.height
                    },
                    // cx
                    {
                      isNear: this.isNear(dragRect.top + dragHalfHeight, top + nodeHalfHeight),
                      lineNode: lines.xc,
                      lineValue: top + nodeHalfHeight,
                      dragValue: top + nodeHalfHeight - dragHalfHeight
                    },
                    // xb-top
                    {
                      isNear: this.isNear(dragRect.bottom, bottom),
                      lineNode: lines.xb,
                      lineValue: bottom,
                      dragValue: bottom - dragRect.height
                    },
                    // xb-bottom
                    {
                      isNear: this.isNear(dragRect.top, bottom),
                      lineNode: lines.xb,
                      lineValue: bottom,
                      dragValue: bottom
                    }
                ],
                left:[
                    {
                        isNear: this.isNear(dragRect.left, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left
                      },
                      {
                        isNear: this.isNear(dragRect.right, left),
                        lineNode: lines.yl,
                        lineValue: left,
                        dragValue: left - dragRect.width
                      },
                      {
                        isNear: this.isNear(dragRect.left + dragHalfWidth, left + nodeHalfWidth),
                        lineNode: lines.yc,
                        lineValue: left + nodeHalfWidth,
                        dragValue: left + nodeHalfWidth - dragHalfWidth
                      },
                      {
                        isNear: this.isNear(dragRect.right, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right - dragRect.width
                      },
                      {
                        isNear: this.isNear(dragRect.left, right),
                        lineNode: lines.yr,
                        lineValue: right,
                        dragValue: right
                      }
                ]
            };

            for(let key in conditions){
                conditions[key].forEach(condition => {
                    // If two nodes are not approaching,do nothing!
                    if(!condition.isNear){
                        return;
                    }
                    node.classList.add("ref-line-active");
                    // Set the left and top value about the dragging element and the line element
                    // 1px difference?
                    (dragging as HTMLDivElement).style[key] = `${ parseInt(condition.dragValue) - parseInt(parentRect[key]) }px`;
                    condition.lineNode.style[key] = `${ parseInt(condition.lineValue)}px`;
                    // show the line element
                    condition.lineNode.show();
                })
            }
        })
    }
    uncheckNearNode(){
        // hide the node
        Object.values(lines).forEach(item => item.hide());
        // remove the active class
        Array.from(document.querySelectorAll(".ref-line-active")).forEach(node => node.classList.remove("ref-line-active"));
    }
    /**
     *  how to tell if two nodes are approaching
     * @param a 
     * @param b 
     * @returns 
     */
    isNear(a:number,b:number){
        // Exceed the default spacing,you will know that two nodes are approaching each other.
        return Math.abs(a - b) < this.options.gap;
    }
}