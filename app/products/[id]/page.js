'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCrud } from '../../context/Crudcontext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProductDetail = () => {
  const { id } = useParams();
  const { productDetail, fetchProductDetail } = useCrud();

  useEffect(() => {
    if (id) {
      fetchProductDetail(id); // Llamada para obtener el detalle del producto
    }
  }, [id, fetchProductDetail]);

  if (!productDetail) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold">{productDetail.name}</h1>
      <p className="text-lg text-gray-600">{productDetail.description}</p>
      <div className="mt-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Comprar
        </button>
        <Link href={'/'}>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          volver
        </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductDetail;
