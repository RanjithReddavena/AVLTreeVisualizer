class Node{
constructor(value){
this.value=value
this.left=null
this.right=null
this.height=1
}
}

let root=null

function height(n){
return n ? n.height : 0
}

function balance(n){
return n ? height(n.left)-height(n.right) : 0
}

function rightRotate(y){

let x=y.left
let t2=x.right

x.right=y
y.left=t2

y.height=Math.max(height(y.left),height(y.right))+1
x.height=Math.max(height(x.left),height(x.right))+1

return x
}

function leftRotate(x){

let y=x.right
let t2=y.left

y.left=x
x.right=t2

x.height=Math.max(height(x.left),height(x.right))+1
y.height=Math.max(height(y.left),height(y.right))+1

return y
}

function insert(node,value){

if(node==null) return new Node(value)

if(value < node.value)
node.left=insert(node.left,value)

else
node.right=insert(node.right,value) // duplicates go right

node.height=1+Math.max(height(node.left),height(node.right))

let b=balance(node)

if(b>1 && value<node.left.value)
return rightRotate(node)

if(b<-1 && value>=node.right.value)
return leftRotate(node)

if(b>1 && value>=node.left.value){
node.left=leftRotate(node.left)
return rightRotate(node)
}

if(b<-1 && value<node.right.value){
node.right=rightRotate(node.right)
return leftRotate(node)
}

return node
}

function insertValue(){

let val=document.getElementById("value").value

if(val=="") return

root=insert(root,parseInt(val))

drawTree(root)

document.getElementById("value").value=""
}

function drawTree(root){

let svg=document.getElementById("treeCanvas")

svg.innerHTML=""

let width=svg.clientWidth

function draw(node,x,y,depth){

if(!node) return

let gap=250/(depth+1)

let circle=document.createElementNS("http://www.w3.org/2000/svg","circle")
circle.setAttribute("cx",x)
circle.setAttribute("cy",y)
circle.setAttribute("r",22)
svg.appendChild(circle)

let text=document.createElementNS("http://www.w3.org/2000/svg","text")
text.setAttribute("x",x)
text.setAttribute("y",y)
text.textContent=node.value
svg.appendChild(text)

if(node.left){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("y1",y+20)

line.setAttribute("x2",x-gap)
line.setAttribute("y2",y+80)

svg.appendChild(line)

draw(node.left,x-gap,y+80,depth+1)
}

if(node.right){

let line=document.createElementNS("http://www.w3.org/2000/svg","line")

line.setAttribute("x1",x)
line.setAttribute("y1",y+20)

line.setAttribute("x2",x+gap)
line.setAttribute("y2",y+80)

svg.appendChild(line)

draw(node.right,x+gap,y+80,depth+1)
}

}

draw(root,width/2,60,0)

}