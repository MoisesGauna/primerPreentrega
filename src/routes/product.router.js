import { Router } from "express";
import { productManager } from "../app.js";

const productRouter = Router()

productRouter.get('/', async (req, res) =>{
    try{
        const{limit} = req.query;
        const products =  productManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }else{
            return res.json(products)
        }
        
    }catch (error){
        console.log(error);
        res.send('Error al intentar recibir los productos!')
    }
})

productRouter.get('/:pid', async (req, res)=>{
    const {pid} = req.params;
    try {
        
        const products = await productManager.getProductById(pid)
        res.json(products)

    } catch (error) {
        console.log(error);
        res.send(`Error al intentar recibir el producto con ID:${pid}`)
    }

})

productRouter.post('/', async (req, res)=>{
    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.addProduct({title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send('Error al intentar agregar producto')
    }
})

productRouter.put('/:pid', async (req, res) =>{
    const {pid} = req.params;

    try {
        const {title, description, price, thumbnail, code, stock, status = true, category} = req.body;
        const response = await productManager.updateProduct(pid, {title, description, price, thumbnail, code, stock, status, category})
        res.json(response)
    } catch (error) {
        console.log(error)
        res.send( `Error al intentar editar el producto con id:${pid} `)
    }
})

productRouter.delete('/:pid', async (req, res) => {
    const { pid } = req.params;
    try {
        await productManager.deleteProduct(pid)
        res.send('PRODUCTO ELIMINADO CORRECTAMENTE !')
    }
    catch (error) {
        res.send(`ERROR AL ELIMINAR EL PRODUCTO CON ID ${pid}`)
    }
})


export {productRouter}