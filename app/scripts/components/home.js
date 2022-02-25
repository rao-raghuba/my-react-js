/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from "react";
import { ProductsContext, ProductsProvider } from "../context/productsContexts";

class Home extends React.PureComponent {
  static contextType = ProductsContext;

  componentDidMount() {
    this.context.loadProducts();
  }

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof Home
   */
  render() {
    return (
      <section id="home">
        <div className="content">
          <ProductsContext.Consumer>
            {({ products, loading }) => {
              console.log(products);
              console.log(loading);

              return (
                <div>
                  {products.map((product) => {
                    return (
                      <div key={product._id}>
                        <img
                          src={product.picture}
                          alt={product.name}
                          height={100}
                          width={100}
                          lazy
                        />
                        <h2>{product.name}</h2>
                        <p>{product.about}</p>
                        <div>
                          {product.tags.map((tag) => (
                            <div key={tag}>{tag}</div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }}
          </ProductsContext.Consumer>
        </div>
      </section>
    );
  }
}

// Export out the React Component
module.exports = Home;
