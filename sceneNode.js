/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        
        // Obtain the local transformation matrix from the TRS object
        var localTransform = this.trs.getTransformationMatrix();
        
        // Apply the local transformation to the matrices
        var updatedMvp = MatrixMult(mvp, localTransform);
        var updatedModelView = MatrixMult(modelView, localTransform);
        var updatedNormals = MatrixMult(normalMatrix, localTransform); // Depending on the framework, this might need additional calculations
        var updatedModel = MatrixMult(modelMatrix, localTransform);
        
        // Render the mesh associated with this node if there is one
        if (this.meshDrawer) {
            this.meshDrawer.draw(updatedMvp, updatedModelView, updatedNormals, updatedModel);
        }
        
        // Iterate over and draw each child node with the updated matrices
        this.children.forEach(child => {
            child.draw(updatedMvp, updatedModelView, updatedNormals, updatedModel);
        });
    }
    

    

}