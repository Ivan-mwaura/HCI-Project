import { useState, useEffect } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Cookies from 'js-cookie';
import XIcon from '@mui/icons-material/X';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MenuIcon from '@mui/icons-material/Menu';
import UserNotLoggedIn from './UserNotLoggedIn';
import { Textarea } from '@/components/ui/textarea';
import SchoolIcon from '@mui/icons-material/School';
import CommentIcon from '@mui/icons-material/Comment';
import ShareMicroBlog from '@/components/ShareMicroBlog';
import InstagramIcon from '@mui/icons-material/Instagram';
import NavProfilePhoto from '@/components/NavProfilePhoto';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import { useGetDealsQuery } from '@/redux/features/dealSlice';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useGetAllCategoriesQuery } from '@/redux/features/categorySlice';
import { useGetAllMicroBlogsQuery } from '@/redux/features/microBlogSlice';
import StudentEmailNotConfirmed from '@/components/StudentEmailNotConfirmed';
import { useGetAuthenticatedUserQuery } from '@/redux/features/userAuthSlice';
import { useStoreDealActivityMutation } from '@/redux/features/dealActivitySlice';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';


const Home = () => {
  const navigate = useNavigate();
  let token = Cookies.get('token');

  // for UserNotLoggedIn dialog
  const [open, setOpen] = useState(false);
  const [openSENC, setOpenSENC] = useState(false);
  const [action, setAction] = useState('create a deal');
  const [showNav, setShowNav] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const [storeDealActivity] = useStoreDealActivityMutation();

  const { data: user, isLoading: isLoadingUser } =
    useGetAuthenticatedUserQuery();
  const { data: categories, isLoading } = useGetAllCategoriesQuery();
  const { data: deals, isLoading: isLoadingDeals } = useGetDealsQuery();
  const { data: microBlogs, isLoading: isLoadingMicroBlogs } =
    useGetAllMicroBlogsQuery();

  const filterApprovedDeals = () => {
    return deals.data?.length > 0
      ? deals.data.slice(0, 5).filter((deal) => deal.status === 1)
      : [];
  };

  const handleViewDeal = (id) => {
    storeDealActivity({ deal_id: id })
      .unwrap()
      .then((response) => console.log(response));
    navigate(`/deals/${id}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const categorie = [
    { id: 1, name: 'Footwear', imageUrl: 'https://media.istockphoto.com/id/1279108197/photo/variety-of-womens-fashion-comfortable-shoes-of-all-seasons-on-a-light-background-top-view.jpg?s=612x612&w=0&k=20&c=_mdUMo2tsufgilqv8IQeW6hp8YjICTR8_tF-YP1Zgxk=' },
    { id: 2, name: 'Fashion', imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D' },
    { id: 3, name: 'Tech', imageUrl: 'https://cdn.prod.website-files.com/5e0f1144930a8bc8aace526c/65dd33d49a346d9be0b075ea_65dd12fa299e167d189f00f7-fed9c2116dfcf56370cea3063f4e88fa.jpeg' },
  ];
  const dealie = [
    {
      id: 1,
      brandName: 'Nike',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
      title: 'Up to 40% Off on Running Shoes',
      imageUrl: 'https://images.pexels.com/photos/267320/pexels-photo-267320.jpeg',
    },
    {
      id: 2,
      brandName: 'Adidas',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
      title: 'Exclusive Deals on Sports Shoes',
      imageUrl: 'https://images.pexels.com/photos/292999/pexels-photo-292999.jpeg',
    },
    {
      id: 3,
      brandName: 'Puma',
      logoUrl: 'https://cdn.icon-icons.com/icons2/2845/PNG/512/puma_logo_icon_181343.png',
      title: 'Save 30% on Lifestyle Footwear',
      imageUrl: 'https://images.pexels.com/photos/19090/pexels-photo.jpg',
    },
    {
      id: 4,
      brandName: 'Reebok',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf2Yx2OAVH5gav-NJjbdC0bTfd6unFDKcHEA&s',
      title: 'Up to 50% Off on Training Shoes',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7uriwtYggZqlBVz9j-4QVLjH-28j6XlRHUQ&s',
    },
    {
      id: 5,
      brandName: 'New Balance',
      logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTefvfrbdRJ9YS5yANmTvvN3eNc1pCHOHawvA&s',
      title: 'Special Prices on Running Shoes',
      imageUrl: 'https://bigshoes.com/cdn/shop/articles/sdt-983-2.jpg?v=1709561309',
    },
  ];
  
  



  if (isLoading || isLoadingDeals || isLoadingUser) return <p>Loading...</p>;

  return (
    <>
      <UserNotLoggedIn open={open} setOpen={setOpen} action={action} />
      <StudentEmailNotConfirmed
        open={openSENC}
        setOpen={setOpenSENC}
        action={action}
        userId={user ? user.id : null}
      />
      {/* hero */}
      <div className='lg:hidden'>
        <MenuIcon
          className='fixed top-4 left-4 z-30 text-grey300 '
          onClick={() => setShowNav(!showNav)}
        />
      </div>

      <nav
        className={`${
          showNav ? 'block bg-white' : 'hidden'
        } lg:flex justify-between items-center fixed top-0 z-20 w-full p-4 transition duration-300 ease-in-out ${
          scrolling ? 'bg-white' : null
        }`}
      >
        <a
          href='/'
          className={`transition duration-300 ease-in-out text-5xl font-medium block mt-8 lg:mt-0 text-burgundy500 font-playfair`}
        >
          <img src='/whizDealsWatermark.png' className='h-20' />
        </a>

        {/* categories */}
        <div className='my-3 lg:my-0'>
          {/* {categories.data.slice(0, 3).map((category) => {
            return (
              <a
                key={category.id}
                href={`/deals#${category.category_name}`}
                className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underline block lg:inline'
              >
                {category.category_name}
              </a>
            );
          })} */}
          <a
            href='/deals#Footwear'
            className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underlineblock lg:inline'
          >
            Footwear
          </a>
          <a
            href='/deals#Fashion'
            className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underlineblock lg:inline'
          >
            Apparel
          </a>
          <a
            href='/deals#Technology'
            className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underlineblock lg:inline'
          >
            Tech
          </a>
          <a
            href='#categories'
            className='mx-3 transition duration-300 ease-in-out hover:text-burgundy500 hover:underlineblock lg:inline'
          >
            More
          </a>
        </div>

        <div className='flex items-end gap-5'>

          {/* post a deal */}
          {/* <div className='flex flex-col items-center'>
            <AddCircleOutlineIcon
              style={{ fontSize: '2.75rem' }}
              className='cursor-pointer'
              onClick={() => {
                // token ? navigate('/micro-blogs/create') : setOpen(true)
                setAction('create a deal');
                token && user.studentEmailVerified === 1
                  ? navigate('/micro-blogs/create')
                  : token && user.studentEmailVerified === 0
                  ? setOpenSENC(true)
                  : setOpen(true);
              }}
            />
            <span className='text-sm font-light text-grey300'>Post a Deal</span>
          </div> */}

          {/* student placement */}
          <div
            className='flex flex-col items-center'
            onClick={() => navigate('/student-placements')}
          >
            <SchoolIcon
              style={{ fontSize: '2.75rem' }}
              className='cursor-pointer'
            />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <span className='text-sm font-light text-grey300 text-center'>
                    Student place...
                  </span>
                </TooltipTrigger>
                <TooltipContent side='right' className='bg-grey200'>
                  <p>Student placements</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <NavProfilePhoto token={token} user={user} />
        </div>
      </nav>

      <div
        className='bg-no-repeat bg-cover mt-24 text-center py-32 px-3'
        style={{
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0.6)),url('/heroImg4.jpg')",
        }}
      >
        <h3 className='text-xl text-burgundy500 font-bold mb-3 lg:text-3xl z-10'>
          Simply the best student deals in Canada!
          {/* Great student discounts from <br /> your favourite brands! */}
        </h3>
        <p className='text-grey300 text-sm font-semibold lg:text-lg lg:w-[52ch] block mx-auto'>
          Make the best of your student life with amazing deals, found by the
          WhizDeals community and scouts, right here on WhizDeals.ca!
        </p>
      </div>
      <div className="container my-3">
        <p className="text-center text-sm text-grey300 italic w-[92ch] block mx-auto">Whizdeals.ca scouts research and curate the best deals from our partner brands. We may earn a commission when you use our links to shop. Signed-up students can share deals they find elsewhere with their friends on the &apos;Deals Chat&apos;  </p>
      </div>

      {/* Deals & Microblog */}
      <section className='pt-3 container'>
        <div className='lg:grid grid-cols-12 gap-4'>
          {/* deals */}
          <div className='col-span-12 mb-3'>
            <h2 className='lg:text-xl font-semibold text-grey400 mb-3'>
              Deals from your favourite brands
            </h2>

            <div className='lg:grid grid-cols-4 gap-4'>
              {dealie.map((deal, idx) => {
                return (
                  <div className='mb-3 first:col-span-2 ' key={deal.id}>
                    {idx === 0 ? (
                      <div className='flex justify-between relative '>
                        <div className='text-center flex-1 bg-burgundy100 rounded-l-xl py-3 '>
                          <img
                            src={deal.logoUrl}
                            className='rounded-full h-16 w-16 mx-auto my-3 lg:my-9 object-contain'
                          />
                          <h3 className='text-burgundy500 font-playfair text-xl lg:text-3xl mb-5'>
                            {deal.brandName}
                          </h3>
                          <p className='text-grey350 text-sm lg:text-xl mb-3 line-clamp-3'>
                            {deal.title}
                          </p>
                          <Button
                            variant='outline'
                            className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400 bg-transparent text-xs lg:text-base'
                            onClick={() => handleViewDeal(deal.id)}
                          >
                            View details -&gt;
                          </Button>
                        </div>
                        <img
                          className='object-cover flex-1 lg:h-[19rem] lg:min-h-[19rem] rounded-r-xl w-full'
                          src={deal.imageUrl}
                        />
                      </div>
                    ) : (
                      <div className=''>
                        {deal.logoUrl ? (
                          <img
                            src={deal.logoUrl}
                            className='h-16 w-16 rounded-full mx-auto -mb-8 z-10 relative object-contain bg-grey50'
                          />
                        ) : (
                          <img
                            src='beauty.png'
                            className='h-16 w-16 rounded-full mx-auto -mb-8 z-10 relative'
                          />
                        )}
                        <img
                          className='h-36 w-full object-cover rounded-xl mb-3'
                          src={deal.imageUrl}
                        />
                        <div>
                          <p className='mb-3 text-grey300 line-clamp-3'>
                            {deal.title}
                          </p>
                          <Button
                            variant='outline'
                            className='border-burgundy500 border-2 text-burgundy500 hover:bg-burgundy100 hover:text-burgundy400 hover:border-burgundy400'
                            onClick={() => handleViewDeal(deal.id)}
                          >
                            View details -&gt;
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center" >
            {/* className='lg:grid grid-cols-3 gap-4' */}
              <Button
                className=''
                onClick={() => navigate('/deals')}
              >
                View all Deals
              </Button>
            </div>
          </div>

          {/* microblogs */}
          {/* <div className='col-span-4 mb-3'>
            <h2 className='text-xl font-semibold text-grey400'>Deals Chat</h2>
            <p className='text-grey400 lg:font-semibold text-sm'>
              Discounts found by students and WhizDeals scouts
            </p>
            <Button
              className='lg:font-semibold mt-3'
              onClick={() => {
                setAction('create a deal');
                token && user.studentEmailVerified === 1
                  ? navigate('/micro-blogs/create')
                  : token && user.studentEmailVerified === 0
                  ? setOpenSENC(true)
                  : setOpen(true);
              }}
            >
              Post a deal
            </Button>
            <div className='mt-3 grid lg:grid-cols-2 gap-2'>
              {!isLoadingMicroBlogs ? (
                <>
                {console.log(microBlogs)}
                  {microBlogs.data.slice(0, 6).map((microBlog) => (
                    
                      <div className='mb-3 border rounded-md px-3 flex flex-col justify-between' key={microBlog.id}>
                        <div>
                          <p className="font-light text-sm text-grey300 my-1">Found by {microBlog.user.first_name}</p>
                          <img
                            src={`${import.meta.env.VITE_FILE_URL}/microblogs/${
                              microBlog.image_url
                            }`}
                            className='h-20 w-full object-contain rounded-sm  cursor-pointer bg-grey50'
                            onClick={() => {
                              setAction('view deal details');
                              token && user.studentEmailVerified === 1
                                ? navigate(`/micro-blogs/${microBlog.id}`)
                                : token && user.studentEmailVerified === 0
                                ? setOpenSENC(true)
                                : setOpen(true);
                            }}
                          />
                          <p className='font-medium text-grey300 line-clamp-3 mb-10'>
                            {microBlog.title}
                          </p>
                        </div>
                        <div className='flex items-center justify-between mr-5 my-3'>
                          <div className='flex gap-3 text-grey200'>
                            <div className='flex items-center gap-1'>
                              <ThumbUpAltIcon fontSize='small' />
                              <span>
                                {microBlog.micro_blog_favourite_count}
                              </span>
                            </div>
                            <div className='flex items-center gap-1'>
                              <CommentIcon fontSize='small' />
                              <span>{microBlog.parent_comment_count}</span>
                            </div>
                          </div>
                          <ShareMicroBlog
                            shareIconSize='small'
                            shareIconStyles={'text-grey200'}
                          />
                        </div>
                      </div>
                    
                  ))}
                  <button
                    onClick={() => navigate(`/micro-blogs`)}
                    className='text-burgundy400 p-2 rounded-lg text-sm font-bold cursor-pointer border-2 border-burgundy200 
                                hover:border-burgundy400 transition col-start-1 col-span-1'
                  >
                    View all Chats
                  </button>
                </>
              ) : (
                <p>No micro blogs available</p>
              )}
            </div>
          </div> */}
        </div>
        <div className='py-7'>
          {/* <Button className='mx-auto block' onClick={() => navigate('/deals')}>
            View all deals
          </Button> */}
        </div>
      </section>

      {/* why choose us */}
      <section className='pt-24 bg-grey50 pb-24'>
        <h2 className='text-center text-burgundy500 text-3xl lg:text-4xl mb-12'>
          Why shop on WhizDeals
        </h2>
        <div className='lg:flex gap-24 justify-center px-8'>
          <Card className='my-3'>
            <img
              src='wcu1.png'
              alt='students viewing sunset'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Student-Centric Deals
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Our platform is designed with students in mind. Discover deals
              that cater to your lifestyle, from study essentials to
              entertainment and beyond.
            </CardContent>
          </Card>
          <Card className='my-3'>
            <img
              src='wcu2.png'
              alt='student raising arms while walking'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Verified Discounts
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Rest assured, every deal on our platform is carefully curated and
              verified to ensure you get the best discounts available.
            </CardContent>
          </Card>
          <Card className='my-3'>
            <img
              src='wcu3.png'
              alt='students happily chatting while using device'
              className='w-full rounded-t-md'
            />
            <CardHeader>
              <CardTitle className='text-burgundy500 text-xl'>
                Easy-to-Use Interface
              </CardTitle>
            </CardHeader>
            <CardContent className='w-[25ch] text-grey200 '>
              Navigate our user-friendly interface effortlessly. Find deals,
              redeem discounts and explore a world of savings with just a few
              clicks.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* categories */}
      <section className='pt-24 pb-24' id='categories'>
        <h2 className='text-center text-burgundy500 text-3xl lg:text-4xl mb-12'>
          Categories
        </h2>
        <div className='grid place-items-center px-4'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-32 md:gap-y-8 mx-auto'>
            {categorie.map((category) => {
              return (
                <div className='relative group' key={category.id}>
                  <img
                    // h- 180, w-170
                    className='max-h-48 w-full object-cover'
                    src={category.imageUrl}
                    alt='drinks and food category'
                  />
                  <div className='absolute top-0 z-10 h-full border w-full text-white p-3 bg-translusentBlack  flex-col justify-end items-center hidden group-hover:flex'>
                    {/* style={{background: 'rgba(0,0,0, )'}} */}
                    <p className=''>{category.name}</p>
                    <button
                      className='my-3 text-sm font-semibold bg-burgundy300 rounded-md w-fit px-3 py-1'
                      onClick={() =>
                        navigate(`/deals#${category.category_name}`)
                      }
                    >
                      View more
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* connect with us */}
      <section className='bg-redFlowBg text-white bg-cover bg-no-repeat py-12'>
        <h3 className='text-center text-3xl lg:text-4xl py-12 '>
          Connect With Us
        </h3>
        {/* social icons */}
        <div className='lg:w-3/5 mx-auto'>
          <div className='flex justify-around mb-16 mt-4'>
            <a href='#'>
              <InstagramIcon />
            </a>
            <a href='#'>
              <FacebookRoundedIcon />
            </a>
            <a href='#'>
              <XIcon />
            </a>
          </div>
          <div>
            <Button
              className='mx-auto block lg:w-1/3 my-3'
              onClick={() => navigate('/do/register')}
            >
              Sign up as a vendor
            </Button>
          </div>
          <form className='px-8 lg:px-36'>
            <Label className='mb-3 block text-xl'>Send us a message</Label>
            <Textarea
              className='bg-white h-32 text-grey300'
              placeholder='Type your message here.'
            />
            <Button className='w-full my-4'>Send</Button>
          </form>
        </div>
        <div>
        <a href="/terms-and-conditions" className='block mx-auto text-center text-white underline mb-3'>
              Terms and Conditions
            </a>
            <a href="/privacy" className='block mx-auto text-center text-white underline'>
              Privacy Policy
            </a>
        </div>
      </section>
    </>
  );
};

export default Home;
