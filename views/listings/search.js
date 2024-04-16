<% layout("/layouts/boilerplate") %>
<style>
  #filters {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  .filter {
    text-align: center;
    margin-right: 2rem;
    margin-top: 2rem;
    opacity: 0.7;
  }

  .filter:hover {
    opacity: 1;
    cursor: pointer;

    border-bottom: 1px solid rgb(84, 84, 84);
  }

  .fa-fort-awesome,
  .fa-person-swimming {
    font-size: 1.1rem;
  }

  .filter p {
    font-size: 0.8rem;
  }

  .tax-info {
    display: none;
  }

  .tax-toggle {
    border: 1px solid black;
    border-radius: 1rem;
    height: 3.25rem;
    padding: 1rem;
    margin-left: 5rem;
    display: flex;
    align-items: center;
  }
  .tax-toggle:hover {
    box-shadow: 2px 2px 4px 2px rgba(0, 0, 0, 0.2);
  }
  .filter div a {
    color: black;
    opacity: 0.8;
  }
</style>

<div id="filters">
  <div class="filter">
    <div>
      <a href="/listings"><i class="fa-solid fa-fire"></i></a>
    </div>
    <p>Trending</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Villas"><i class="fa-solid fa-bed"></i></a>
    </div>
    <p>Villas</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/IconicCities"
        ><i class="fa-solid fa-mountain-city"></i
      ></a>
    </div>
    <p>Iconic cities</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Mountains"><i class="fa-solid fa-mountain"></i></a>
    </div>
    <p>Mountains</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Beach"><i class="fa-brands fa-fort-awesome"></i></a>
    </div>
    <p>Beach</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/AmazingPools"
        ><i class="fa-solid fa-person-swimming"></i
      ></a>
    </div>
    <p>Amazing Pools</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Camping"><i class="fa-solid fa-campground"></i></a>
    </div>
    <p>Camping</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Farms"><i class="fa-solid fa-tractor"></i></a>
    </div>
    <p>Farms</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Arctic"><i class="fa-regular fa-snowflake"></i></a>
    </div>
    <p>Arctic</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Domes"><i class="fa-solid fa-igloo"></i></a>
    </div>
    <p>Domes</p>
  </div>
  <div class="filter">
    <div>
      <a href="/listings/Boats"><i class="fa-solid fa-ferry"></i></a>
    </div>
    <p>Boats</p>
  </div>
  <div class="tax-toggle">
    <div class="form-check-reverse form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="flexSwitchCheckDefault" />
      <label class="form-check-label" for="flexSwitchCheckDefault"
        >Display total after taxes</label
      >
    </div>
  </div>
</div>
<body>
  <div class="row row-cols-lg-3 row-cols-md-2 row-cols-sm-1 mt-3">
    <%if(matchingListing.length !== 0 ){%> <%for(let listing of matchingListing
    ) {%>
    <a href="/listings/<%=listing._id%>" class="listing-link">
      <div class="listing-card col card">
        <img
          src="<%=listing.image%>"
          class="card-img-top"
          alt="listing_image"
          style="height: 20rem" />
        <div class="card-img-overlay"></div>
        <div class="card-body">
          <p class="card-text">
            <b> <%=listing.title%></b><br />&#8377;
            <%=listing.price.toLocaleString("en-IN")%> / night
            <i class="tax-info"> &nbsp;&nbsp;+18% GST</i>
          </p>
        </div>
      </div>
    </a>
    <%}%> <% }else if(matchingListing.length === 0){%> <%for(let listing of
    allListings) {%>
    <a href="/listings/<%=listing._id%>" class="listing-link">
      <div class="listing-card col card">
        <img
          src="<%=listing.image%>"
          class="card-img-top"
          alt="listing_image"
          style="height: 20rem" />
        <div class="card-img-overlay"></div>
        <div class="card-body">
          <p class="card-text">
            <b> <%=listing.title%></b><br />&#8377; <% if (listing.price) { %>
            <%= listing.price.toLocaleString("en-IN") %> / night <% } %>
            <i class="tax-info"> &nbsp;&nbsp;+18% GST</i>
          </p>
        </div>
      </div>
    </a>
    <%}%> <%}%>
  </div>
</body>
<script>
  let taxSwitch = document.getElementById("flexSwitchCheckDefault");
  taxSwitch.addEventListener("click", () => {
    let taxInfo = document.getElementsByClassName("tax-info");
    for (info of taxInfo) {
      if (info.style.display != "inline") {
        info.style.display = "inline";
      } else {
        info.style.display = "none";
      }
    }
  });
</script>