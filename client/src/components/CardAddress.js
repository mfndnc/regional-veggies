import React from 'react';

export default function CardAddress(props) {
  const imgmaxwidth = 400;
  if (props.address) {
    let { address } = props;
    if (address.googleimage && address.alwaysfalse) {
      return (
        <div class="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 row-cols-xl-1">
          <div class="col mb-4">
            <div class="card classic h-100 text-center">
              <div class="row no-gutters">
                <div class="col-md-9">
                  <div class="card-img-top">
                    <img
                      src="https://res.cloudinary.com/mfnpers/image/upload/c_scale,w_600/v1621521612/regional-veggies/438285_tprl8r.jpg"
                      alt="aa"
                    />
                  </div>
                </div>
                <div class="col-md-15">
                  <div class="card-body card-body-horizontal">
                    <h4 class="card-title">
                      <a href="/" title="Überschrift">
                        {' '}
                        Überschrift{' '}
                      </a>
                    </h4>
                    <h5 class="card-subtitle mb-2 text-muted">
                      Unterüberschrift
                    </h5>
                    <div class="card-text">
                      <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et
                        dolore magna aliquyam erat, sed diam voluptua. At vero
                        eos et accusam et justo duo dolores et ea rebum. Stet
                        clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div class="card-footer card-footer-horizontal">
                    <a href="/" title="Link-Titel">
                      <i class="fal fa-chevron-square-right"></i> Link-Titel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-group modern row row-cols-1 row-cols-md-1">
          <div className="col mb-4">
            <div className="card classic h-100 text-left">
              <div className="card-body">
                <h5 className="card-subtitle mb-2 text-muted">
                  {address.name}{' '}
                </h5>
                <div className="card-text">
                  <p>
                    {address.street} {address.suite},{address.zipcode}{' '}
                    {address.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
  return <div></div>;
}
