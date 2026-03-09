import java.util.*;

class AVLNode {

    int data;
    int height;
    AVLNode left, right;

    AVLNode(int data){
        this.data = data;
        this.height = 1;
    }
}

public class AVLTree {

    int height(AVLNode n){
        if(n==null) return 0;
        return n.height;
    }

    int getBF(AVLNode n){
        if(n==null) return 0;
        return height(n.left)-height(n.right);
    }

    AVLNode rightRotate(AVLNode y){

        AVLNode x=y.left;
        AVLNode t2=x.right;

        x.right=y;
        y.left=t2;

        y.height=1+Math.max(height(y.left),height(y.right));
        x.height=1+Math.max(height(x.left),height(x.right));

        return x;
    }

    AVLNode leftRotate(AVLNode x){

        AVLNode y=x.right;
        AVLNode t2=y.left;

        y.left=x;
        x.right=t2;

        x.height=1+Math.max(height(x.left),height(x.right));
        y.height=1+Math.max(height(y.left),height(y.right));

        return y;
    }

    AVLNode insert(AVLNode node,int key){

        if(node==null)
            return new AVLNode(key);

        if(key < node.data)
            node.left = insert(node.left,key);
        else
            node.right = insert(node.right,key); // duplicates right

        node.height = 1 + Math.max(height(node.left),height(node.right));

        int bf = getBF(node);

        if(bf>1 && key < node.left.data)
            return rightRotate(node);

        if(bf<-1 && key >= node.right.data)
            return leftRotate(node);

        if(bf>1 && key >= node.left.data){
            node.left=leftRotate(node.left);
            return rightRotate(node);
        }

        if(bf<-1 && key < node.right.data){
            node.right=rightRotate(node.right);
            return leftRotate(node);
        }

        return node;
    }

    void preorder(AVLNode root){

        if(root!=null){
            System.out.print(root.data+" ");
            preorder(root.left);
            preorder(root.right);
        }
    }

    public static void main(String[] args){

        Scanner sc=new Scanner(System.in);

        AVLTree tree=new AVLTree();
        AVLNode root=null;

        System.out.print("Enter number of nodes: ");
        int n=sc.nextInt();

        for(int i=0;i<n;i++){

            int x=sc.nextInt();
            root=tree.insert(root,x);
        }

        System.out.println("\nPreorder traversal:");
        tree.preorder(root);
    }
}