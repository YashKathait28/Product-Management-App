import {
  Search,
  Trash2,
  Pencil,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useEffect, useState } from "react";

export const Dashboard = () => {
  const [addProduct, setAddProduct] = useState([
    {
      id: crypto.randomUUID(),
      product: "T-shirt",
      price: "50,000",
      status: "Active",
    },
    {
      id: crypto.randomUUID(),
      product: "Shirt",
      price: "2000",
      status: "Active",
    },
    {
      id: crypto.randomUUID(),
      product: "Jacket",
      price: "5500",
      status: "Active",
    },
    {
      id: crypto.randomUUID(),
      product: "Full-sleeves",
      price: "4200",
      status: "Active",
    },
  ]);
  const [product, setProduct] = useState("");
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Active");
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [selectStatus, setSelectStatus] = useState("All status");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleAddProduct = () => {
    if (product.trim() === "" || price.trim() === "") return;
    const newProduct = {
      id: crypto.randomUUID(),
      product: product,
      price: price,
      status: status,
    };

    const updatedProducts = [...addProduct, newProduct];

    setAddProduct(updatedProducts);

    localStorage.setItem("Products", JSON.stringify(updatedProducts));

    setPrice("");
    setProduct("");
    setStatus("Active");
    setIsOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (id) => {
    const filteredProduct = addProduct.filter((item) => item.id !== id);

    setAddProduct(filteredProduct);
    localStorage.setItem("Products", JSON.stringify(filteredProduct));
  };

  const handleEdit = (id) => {
    setEditIndex(id);
    const updatedProduct = addProduct.find((item) => item.id === id);
    setProduct(updatedProduct.product);
    setPrice(updatedProduct.price);
    setStatus(updatedProduct.status);
    setIsOpen(true);
  };

  const handleUpdateProduct = () => {
    if (product.trim() === "" || price.trim() === "") return;
    const newUpdatedProduct = addProduct.map((item) =>
      editIndex === item.id ? { ...item, product, price, status } : item,
    );

    setAddProduct(newUpdatedProduct);
    localStorage.setItem("Products", JSON.stringify(newUpdatedProduct));
    setProduct("");
    setPrice("");
    setStatus("Active");
    setEditIndex(null);
    setIsOpen(false);
  };

  useEffect(() => {
    const savedProducts = localStorage.getItem("Products");

    if (savedProducts) {
      setAddProduct(JSON.parse(savedProducts));
    }
    // console.log(JSON.parse(savedProducts));
  }, []);

  const handleSearch = () => {
    const filteredProduct = addProduct.filter((item) => {
      const matchSearch =
        item.product.toLowerCase().includes(search.toLowerCase()) ||
        item.price.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        selectStatus === "All status" || item.status === selectStatus;

      return matchSearch && matchStatus;
    });

    return filteredProduct;
  };

  const productsPerPage = 5;
  const totalPages = Math.ceil(handleSearch().length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = handleSearch().slice(startIndex, endIndex);

  return (
    <div className="min-h-screen m-0 p-5 bg-amber-50">
      <div className="border-2 bg-indigo-50 mt-2 md:mt-0 mx-0 md:mx-auto p-3 md:p-5 md:max-w-4xl shadow-2xl rounded-lg overflow-auto">
        <nav className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="flex gap-5 md:gap-4">
            <img src="favicon.svg" className="h-8 w-8 mt-1"></img>
            <h2 className="text-xl md:text-2xl font-semibold">
              Product Dashboard
            </h2>
          </div>
          <button
            className="md:text-lg text-md mt-1 md:mt-0 cursor-pointer font-mono border-2 rounded-xl md:rounded-2xl px-3 py-2 md:px-2 md:py-2 ml-2 md:ml-0 bg-black text-white"
            onClick={() => setIsOpen(true)}
          >
            +Add Product
          </button>
          {isOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white w-full max-w-78 md:max-w-auto p-6 rounded-2xl shadow-2xl">
                <h2 className="text-xl font-semibold mb-5 text-center">
                  {editIndex === null ? "Add Product" : "Edit Product"}
                </h2>
                <div>
                  <input
                    type="text"
                    placeholder="Product Name"
                    className="border-2 rounded-lg p-3 mb-3 outline-none focus:ring-2 w-full focus:ring-indigo-500"
                    value={product}
                    onChange={(e) => setProduct(e.currentTarget.value)}
                  />
                  <input
                    type="text"
                    placeholder="Product Price"
                    className="border-2 rounded-lg p-3 mb-3 outline-none focus:ring-2 w-full focus:ring-indigo-500"
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                  />
                </div>

                <div className="relative">
                  <button
                    className="border-2 text-md w-full rounded-lg p-3 cursor-pointer flex justify-between items-center"
                    onClick={() => setIsStatusOpen(!isStatusOpen)}
                  >
                    <span>{status}</span>
                    {isStatusOpen === false ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </button>
                  {isStatusOpen && (
                    <div className="absolute left-0 mt-2 w-full border-2 bg-indigo-50 rounded-lg overflow-hidden">
                      {["Active", "Inactive"].map((item) => (
                        <button
                          key={item}
                          className="block w-full text-left px-2 py-1 hover:bg-indigo-100 cursor-pointer"
                          onClick={() => {
                            setIsStatusOpen(false);
                            setStatus(item);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-center gap-3 mt-5">
                  <button
                    className="border bg-gray-600 text-white cursor-pointer hover:bg-gray-700 rounded-xl px-3 py-2"
                    onClick={() => {
                      setIsOpen(false);
                      setEditIndex(null);
                      setProduct("");
                      setPrice("");
                      setStatus("Active");
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="border bg-red-600 cursor-pointer hover:bg-red-700 text-white rounded-xl px-3 py-2"
                    onClick={
                      editIndex === null
                        ? handleAddProduct
                        : handleUpdateProduct
                    }
                  >
                    {editIndex === null ? "Add new product" : "Edit Product"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
        <div className="grid grid-cols-3 gap-2 md:gap-5">
          <div className="border-2 bg-white rounded-lg h-25 flex flex-col justify-between shadow-lg  px-2 py-2 mt-3 md:mt-6 md:px-5 md:py-3">
            <h3 className="md:text-lg text-md font-semibold">Total Products</h3>
            <p className="md:text-2xl text-xl font-bold">{addProduct.length}</p>
          </div>
          <div className="border-2 bg-white rounded-lg h-25 flex flex-col justify-between shadow-lg  px-2 py-2  mt-3 md:mt-6 md:px-5 md:py-3">
            <h3 className="md:text-lg text-md font-semibold">Active</h3>
            <p className="md:text-2xl text-xl font-bold">
              {addProduct.filter((item) => item.status === "Active").length}
            </p>
          </div>
          <div className="border-2 bg-white rounded-lg h-25 flex flex-col justify-between shadow-lg  px-2 py-2 mt-3 md:mt-6 md:px-5 md:py-3">
            <h3 className="md:text-lg text-md font-semibold">Inactive</h3>
            <p className="md:text-2xl text-xl font-bold">
              {addProduct.filter((item) => item.status === "Inactive").length}
            </p>
          </div>
        </div>

        <div className="md:flex md:flex-row md:flex-1 flex-col mb-5 md:mb-0 gap-3 mt-4 md:mt-10">
          <div className="border-2 rounded-2xl w-full flex items-center gap-2 px-3 py-2">
            <Search size={18} className="md:mt-1 mt-0" />
            <input
              type="search"
              placeholder="Search product here..."
              className="w-full min-w-0 border-none outline-none text-md"
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="relative">
            <button
              className="border-2 text-md w-full md:w-27 mt-3 md:mt-0 rounded-xl px-2 py-2 cursor-pointer flex justify-between items-center "
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span>{selectStatus}</span>
              {isFilterOpen === false ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronUp size={18} />
              )}
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 mt-2 w-full md:w-27 border-2 bg-indigo-50 rounded-xl shadow-lg z-50 overflow-hidden">
                {["All status", "Active", "Inactive"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectStatus(item);
                      setIsFilterOpen(false);
                      setCurrentPage(1);
                    }}
                    className="block w-full md:w-27 text-left px-3 py-2 hover:bg-indigo-200 cursor-pointer"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-2 mt-4 rounded-lg p-1 md:p-3 overflow-x-auto">
          {currentProducts.length === 0 ? (
            <p className="text-center text-xl font-medium">No product found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left px-2 py-2">Product</th>
                  <th className="text-left px-2 py-2">Price</th>
                  <th className="text-left px-2 py-2">Status</th>
                  <th className="text-center px-2 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.map((item) => (
                  <tr
                    className="hover:bg-gray-50 last:[&>td]:border-b-0"
                    key={item.id}
                  >
                    <td className="border-b px-2 py-2">{item.product}</td>
                    <td className="border-b px-2 py-2">{item.price}</td>
                    <td className="border-b px-2 py-2">{item.status}</td>
                    <td className="border-b px-2 py-2">
                      <div className="flex justify-center gap-2 md:gap-3">
                        <Pencil
                          size={18}
                          className="cursor-pointer"
                          onClick={() => {
                            handleEdit(item.id);
                          }}
                        />
                        <Trash2
                          size={18}
                          className="cursor-pointer text-red-500"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-between items-center mt-2 m-1">
          <p>
            Showing{" "}
            <span>
              {handleSearch().length === 0 ? 0 : startIndex + 1}
              {" - "}
              {Math.min(endIndex, handleSearch().length)}
              {" of "}
              {handleSearch().length}
            </span>
          </p>
          <div className="flex gap-1 items-center">
            <button disabled={currentPage <= 1}>
              <ChevronLeft
                size={20}
                className="cursor-pointer"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              />
            </button>
            <p className="text-base">{currentPage}</p>
            <button disabled={currentPage >= totalPages}>
              <ChevronRight
                size={20}
                className="cursor-pointer"
                onClick={() =>
                  setCurrentPage(Math.min(currentPage + 1, totalPages))
                }
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
