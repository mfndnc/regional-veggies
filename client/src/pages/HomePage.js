import React from 'react';

export default function HomePage() {
  return (
    <div className="container">
      <div className="row mt-3">
        <div className="colgrid col">
          <div className="card-group modern row row-cols-1 row-cols-md-1">
            <div className="col mb-4">
              <div className="card h-100 text-left">
                <div className="card-img-top">
                  <img
                    src="https://res.cloudinary.com/mfnpers/image/upload/c_scale,w_600/v1621521612/regional-veggies/438285_tprl8r.jpg"
                    alt="aa"
                  />
                </div>
                <div className="card-body-wrap h-100">
                  <div className="card-body">
                    <h4 className="card-title">Did you know!</h4>
                    <h5 className="card-subtitle mb-2 text-muted">
                      ...that you can reduce your carbon footprint just by
                      buying local produces
                    </h5>
                    <div className="card-text">
                      <ul>
                        <li>
                          a comunity to allow you to know where the products are
                          around you
                        </li>
                        <li>from farms, to local shops</li>
                        <li>
                          You can even offer the products you have produced in
                          your personal small garden.
                        </li>
                        <li>Be part of a new movement!</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
