import React, { useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { SideNav, LayoutSidebar, Responsive, CardProduct, Pagination, InputText, Pill } from 'upkit';
import BounceLoader from 'react-spinners/BounceLoader';
import menus from "./menus";
import Topbar from "../../components/Topbar";
import {config} from '../../config';
import { fetchProducts, goToNextPage, goToPrevPage, setPage, setKeyword, setCategory, toggleTag } from '../../features/Products/action';
import {tags} from './tags';

function Home(){
    const dispatch = useDispatch();
    let products = useSelector(state => state.products);
    console.log(products);
    useEffect(() => {
        dispatch(fetchProducts());
    },[dispatch, products.currentPage, products.keyword, products.category, products.tags]);
    return (
        <div>
            <LayoutSidebar 
                sidebar={<SideNav 
                            items={menus} 
                            verticalAlign="top"
                            active={products.category}
                            onChange={category => dispatch(setCategory(category))}
                            />}
                content={<div className="md:flex md:flex-row-reverse w-full mr-5 h-full min-h-screen">
                            <div className="w-full md:w-3/4 pl-5 pb-10">
                                <Topbar />
                                <div className="w-full text-center mb-10 mt-5">
                                    <InputText
                                        fullRound
                                        value={products.keyword}
                                        placeholder="Search your favorite food"
                                        fitContainer
                                        onChange={e => { dispatch(setKeyword(e.target.value))}}
                                    />
                                </div>
                                {products.status === 'process' ? 
                                    <div className="flex justify-center">
                                        <BounceLoader color="red" />
                                    </div>
                                    : null
                                }

                                <div className="mb-5 pl-2 flex w-3/3 overflow-auto pb-5">
                                {tags[products.category].map((tag, index) => {
                                    return <div key={index}>
                                    <Pill
                                        text={tag}
                                        icon={tag.slice(0,1).toUpperCase()}
                                        isActive={products.tags.includes(tag)}
                                        onClick={_ => dispatch(toggleTag(tag))}
                                    />
                                    </div>
                                })}
                                </div>
                                <Responsive desktop={3} items="stretch">
                                    {products.data.map((product, index) => {
                                    return <div key={index} className="p-2">
                                        <CardProduct
                                            title={product.name}
                                            imgUrl=
                                            {`${config.api_host}/upload/${product.image_url}`}
                                            price={product.price}
                                            onAddToCart={_ => null}
                                            />
                                        </div>
                                    })}
                                </Responsive>
                                <div className="text-center my-10">
                                    <Pagination
                                    totalItems={products.totalItems}
                                    page={products.currentPage}
                                    perPage={products.perPage}
                                    onChange={page => dispatch(setPage(page))}
                                    onNext={() => dispatch(goToNextPage())}
                                    onPrev={() => dispatch(goToPrevPage())}
                                    />
                                </div>
                            </div>
                            <div className="w-full md:w-1/4 h-full shadow-lg border-r border-white bg-gray-100">
                                Keranjang belanja di sini
                            </div>
                        </div>}
                sidebarSize={80} />
        </div>
    )
}

export default Home;