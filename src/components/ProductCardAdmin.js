import {MdDeleteForever} from 'react-icons/md'
import {FiEdit} from 'react-icons/fi'
import {Link} from 'react-router-dom'

function ProductCardAdmin({product, handleDelete}) {
    return (
        <div 
        
            className='flex width-full items-center 
            justify-center
            gap-[20px] mb-[20px]'
            
        > 
    
    <span>{product.name}</span>
    <span>{product.price}</span>
    <img  
        className='w-[40px] h-[40px] rounded-full object-cover'
        src={`/images/${product.image}`}/>
    
    <MdDeleteForever className='hover:text-red-500 hover:cursor-pointer'
        onClick={() => handleDelete(product._id)}
        />
        
        <Link to={'/dashboard/products/edit/' + product._id}>
            <FiEdit 
                className='hover:text-red-500 hover:cursor-pointer'
            />
        </Link>
    </div>
      );
}

export default ProductCardAdmin;