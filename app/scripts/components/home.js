/**
 * This file will hold the Main content that lives in the main body of the site
 *
 */
import React from "react";
import { LOAD_PRODUCTS } from "../constants/actionTypes";
import { ProductsContext } from "../context/productsContext";

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
            {({ products, loading, errors }) => {
              const hasLoader = loading.find((x) => x.type === LOAD_PRODUCTS);

              if (hasLoader) {
                return <h3 style={{ color: 'red'}}>{hasLoader.message}</h3>;
              }

              return products.map((product) => (
                <div key={product._id}>
                  <img
                    src={product.picture}
                    alt={XMLDocument.name}
                    lazy="true"
                    height={200}
                    width={200}
                  />
                  <h2>{product.name}</h2>
                  <p>{product.about}</p>
                  <div>
                    {product.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              ));
            }}
          </ProductsContext.Consumer>
        </div>
      </section>
    );
  }
}

// Export out the React Component
module.exports = Home;
