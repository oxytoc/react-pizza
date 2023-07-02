import React from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Categories } from ".././components/Categories";
import { Sort, sortList } from ".././components/Sort";
import { PizzaBlock } from ".././components/PizzaBlock";
import { Skeleton } from ".././components/PizzaBlock/Skeleton";
import { Pagination } from "../components/Pagination";
import { AppContext } from "../App";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import { fetchPiazzas } from "../redux/slices/pizzaSlice";

export const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );

  const { items, status } = useSelector((state) => state.pizzaSlice);

  const sortType = sort.sortProperty;
  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const changeCurrentPage = (number) => {
    dispatch(setCurrentPage(number));
  };

  // const [pizzaItems, setPizzaItems] = React.useState([]);
  // const [isLoading, setIsLoading] = React.useState(true);
  // const [categoryId, setCategoryId] = React.useState(0);
  // const [currentPage, setCurrentPage] = React.useState(1);
  // const [sortType, setSortType] = React.useState({
  //   name: "популярности DESC",
  //   sortProperty: "rating",
  // });

  const { searchValue } = React.useContext(AppContext);

  const skeletons = [...new Array(12)].map((_, inddex) => (
    <Skeleton key={inddex} />
  ));

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const getPiazzas = async () => {
    // setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sorts = sortType.replace("-", "");
    const order = sortType.includes("-") ? "asc" : "desc";
    const search = searchValue ? `search=${searchValue}` : "";

    //отправка запроса в pizzaSlice
    dispatch(
      fetchPiazzas({
        currentPage,
        category,
        sorts,
        order,
        search,
      })
    );
    //   try {
    //     // const { data } = await axios.get(
    //     //   `https://642ffa0ec26d69edc887f702.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sorts}&order=${order}&${search}`
    //     // );
    //     // dispatch(setItems(data));
    //     // setPizzaItems(data);
    //     setIsLoading(false);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
  };

  //Если был первый рендер, то проверяем URl-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      // console.log(sortList[0].sortProperty);
      const findSort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(
        setFilters({
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: findSort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPiazzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  //Вставляем в браузерную строку параметры, после  каких то начальных изменений на сайте
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onClickCategory={(id) => onChangeCategory(id)}
        />

        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      <div className="content__items">
        {/* {isLoading === "loading" ? skeletons : pizzas} */}
        {status === "loading" ? skeletons : pizzas}
      </div>
      <Pagination
        currentPage={currentPage}
        onChangePage={(number) => changeCurrentPage(number)}
      />
    </div>
  );
};
