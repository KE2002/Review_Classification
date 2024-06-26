import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import images_json from "../../assets/images.json";

interface ImageInterface {
  categories: string[];
  products: {
    Electronics: string[];
    Fashion: string[];
    "Home & Décor": string[];
  };
}

interface ProductInterface {
  product_id: string;
  product_title: string;
  product_img: string;
  product_categry: string;
}
interface CategoryInterface {
  product_categry: string;
  selected: boolean;
}

const CategoryDisplay = () => {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [categories, setCategories] = useState<CategoryInterface[]>([]);
  const [selectedCateg, setSelectedCateg] = useState("");
  const [categImg, setCategImg] = useState(
    "https://prod4-sprcdn-assets.sprinklr.com/200052/8797ad9e-cc75-4b75-a27e-320a6310dc15-468706698/450.png"
  );
  const images: ImageInterface = images_json;

  useEffect(() => {
    if (!selectedCateg) {
      fetch("https://backend-absa.vercel.app/categories/findAllCategories")
        .then((response) => response.json())
        .then((data) => {
          data.map(
            (item: {
              category_img: string;
              product_categry: string;
              selected: boolean;
            }) => {
              const randomInt = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
              setCategImg(images.categories[randomInt]);
              if (item.product_categry == selectedCateg) item.selected = true;
              else item.selected = false;
            }
          );
          setCategories(data);
          // console.log(selectedCateg);
          if (data[0]) {
            setSelectedCateg(data[0].product_categry);
            // console.log(selectedCateg);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      fetch("https://backend-absa.vercel.app/categories/findAllProducts", {
        method: "POST",
        body: JSON.stringify({ categName: selectedCateg }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          data.map((item: { product_categry: string; product_img: string }) => {
            // const randomInt = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
            item.product_categry = selectedCateg;
            // item.product_img = images.products[selectedCateg][randomInt];
            // console.log(item.product_img);
          });
          setProducts(data);
          // console.log(selectedCateg);
          console.log(products);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [selectedCateg]);

  const selectCateg = (index: number) => {
    const arr: CategoryInterface[] = categories.map((item, i) => {
      if (index == i) {
        item.selected = true;
        setSelectedCateg(item.product_categry);
        // console.log(selectedCateg);
      } else item.selected = false;
      return item;
    });
    setCategories(arr);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-5/6 max-xl:w-4/5 max-lg:w-4/5">
        <div className="flex mt-20 bg-[#aeabae] rounded-2xl justify-around max-sm:flex-col max-sm:items-center max-sm:gap-5">
          <div className="flex flex-col justify-center text-5xl font-semibold max-xl:text-4xl max-lg:pl-3 max-lg:text-3xl max-sm:text-2xl">
            <p>Explore a World of Products,</p>
            <p>Crafted For You</p>
          </div>
          <div className="max-md:w-3/5">
            <img
              src={categImg}
              alt="Product Image"
              width={300}
              height={400}
              className=""
            />
          </div>
        </div>
        <div className="flex justify-start my-7 gap-9 max-sm:flex-col">
          <div className="flex flex-col bg-[#f3f4f6] max-w-[300px] gap-4 h-max py-5 rounded-lg max-xl:max-w-[200px] max-sm:max-w-full">
            <div className="flex justify-between text-lg bg-[#e7eae8] font-semibold mx-2 px-2 rounded-md">
              <div>Categories</div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M9.29 15.88L13.17 12L9.29 8.12a.996.996 0 1 1 1.41-1.41l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3a.996.996 0 0 1-1.41 0c-.38-.39-.39-1.03 0-1.42z"
                  />
                </svg>
              </div>
            </div>
            {categories.map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() => selectCateg(i)}
                  className="flex items-center justify-between px-4 gap-2 min-w-[300px] cursor-pointer max-xl:min-w-[200px]"
                >
                  <div>{item.product_categry}</div>
                  {item.selected && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L10.6 13.8ZM12 22q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Z"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-10 w-full">
            <div className="text-3xl font-semibold max-sm:text-2xl">
              {selectedCateg}
            </div>
            {products.length ? (
              <div className="grid grid-cols-3 grid-flow-row gap-y-10 gap-x-10 max-xl:grid-cols-2 max-[830px]:grid-cols-1 max-[830px]:self-center">
                {products.map((item, i) => {
                  return (
                    <div key={i} className="w-52 hover:scale-105">
                      <Link to={`product/${item.product_id}`}>
                        <div className="bg-[#d8d8d8] rounded-xl w-52 h-52 hover:shadow-md">
                          <img
                            width={208}
                            height={208}
                            src="https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1689320106/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/275212_io0vgm.png?tr=w-600"
                            alt={item.product_title}
                          />
                        </div>
                        <div className="mt-1">{item.product_title}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex items-start justify-center h-screen mt-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <g stroke="currentColor">
                    <circle
                      cx="12"
                      cy="12"
                      r="9.5"
                      fill="none"
                      strokeLinecap="round"
                      strokeWidth="3"
                    >
                      <animate
                        attributeName="stroke-dasharray"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                        keyTimes="0;0.475;0.95;1"
                        repeatCount="indefinite"
                        values="0 150;42 150;42 150;42 150"
                      />
                      <animate
                        attributeName="stroke-dashoffset"
                        calcMode="spline"
                        dur="1.5s"
                        keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
                        keyTimes="0;0.475;0.95;1"
                        repeatCount="indefinite"
                        values="0;-16;-59;-59"
                      />
                    </circle>
                    <animateTransform
                      attributeName="transform"
                      dur="2s"
                      repeatCount="indefinite"
                      type="rotate"
                      values="0 12 12;360 12 12"
                    />
                  </g>
                </svg>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-center items-center gap-2 mt-20 mb-10">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 16 16"
          >
            <g
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="6.25" />
              <path d="M10 6.75s-.75-1-2-1s-2.25 1-2.25 2.25s1 2.25 2.25 2.25s2-1 2-1" />
            </g>
          </svg>
          core_dumped
        </div>
      </div>
    </div>
  );
};

export default CategoryDisplay;
