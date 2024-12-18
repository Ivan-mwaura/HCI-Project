import { useState } from 'react';
import Nav from './Nav';
import { Button } from '@/components/ui/button';
import { use } from 'react';
import { useNavigate } from 'react-router-dom';

const Deals = () => {
  const [selectedCategory, setSelectedCategory] = useState('Footwear');

  const navigate = useNavigate();

  const deals = [
    // Footwear
    {
      id: 1,
      brandName: 'Nike',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      title: 'Up to 40% Off on Running Shoes',
      imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg',
      category: 'Footwear',
    },
    {
      id: 2,
      brandName: 'Adidas',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      title: 'Exclusive Deals on Sports Shoes',
      imageUrl: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg',
      category: 'Footwear',
    },
    {
      id: 3,
      brandName: 'Puma',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Puma_logo.svg',
      title: 'Save 30% on Lifestyle Footwear',
      imageUrl: 'https://images.pexels.com/photos/19090/pexels-photo.jpg',
      category: 'Footwear',
    },

    // Fashion
    {
      id: 4,
      brandName: 'H&M',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg',
      title: 'Buy 2 Get 1 Free on Apparel',
      imageUrl: 'https://images.pexels.com/photos/1097132/pexels-photo-1097132.jpeg',
      category: 'Fashion',
    },
    {
      id: 5,
      brandName: 'Zara',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/77/Zara_Logo.svg',
      title: 'Trending Fashion Sale',
      imageUrl: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg',
      category: 'Fashion',
    },
    {
      id: 6,
      brandName: 'Uniqlo',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Uniqlo_logo.svg',
      title: 'Casual Wear Discounts',
      imageUrl: 'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg',
      category: 'Fashion',
    },

    // Tech
    {
      id: 7,
      brandName: 'Apple',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      title: 'Discounts on MacBooks',
      imageUrl: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      category: 'Tech',
    },
    {
      id: 8,
      brandName: 'Samsung',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
      title: 'Sale on Smartphones',
      imageUrl: 'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg',
      category: 'Tech',
    },
    {
      id: 9,
      brandName: 'Sony',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Sony_logo.svg',
      title: 'Up to 30% Off on Electronics',
      imageUrl: 'https://images.pexels.com/photos/747976/pexels-photo-747976.jpeg',
      category: 'Tech',
    },
    {
      id: 10,
      brandName: 'Dell',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Dell_Logo.svg',
      title: 'Discounts on Laptops',
      imageUrl: 'https://images.pexels.com/photos/373076/pexels-photo-373076.jpeg',
      category: 'Tech',
    },
  ];

  const handleClickView = () => {

    window.location.href = 'https://www.famousfootwear.ca/en';

  };

  const filteredDeals = deals.filter((deal) => deal.category === selectedCategory);

  return (
    <Nav>
      <div className='container mx-auto'>
        <h2 className='text-2xl font-semibold mb-4'>Deals</h2>
        <div className='flex gap-4 mb-6'>
          <Button onClick={() => setSelectedCategory('Footwear')}>Footwear</Button>
          <Button onClick={() => setSelectedCategory('Fashion')}>Fashion</Button>
          <Button onClick={() => setSelectedCategory('Tech')}>Tech</Button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {filteredDeals.map((deal) => (
            <div key={deal.id} className='border p-4 rounded-lg'>
              <img src={deal.logoUrl} alt={`${deal.brandName} logo`} className='h-12 mb-3' />
              <h3 className='text-lg font-bold'>{deal.brandName}</h3>
              <p className='text-gray-500 mb-3'>{deal.title}</p>
              <img src={deal.imageUrl} alt={deal.title} className='h-40 w-full object-cover rounded-lg mb-3' />
              <Button className='w-full' onClick={handleClickView}>View Details</Button>
            </div>
          ))}
        </div>
      </div>
    </Nav>
  );
};

export default Deals;
