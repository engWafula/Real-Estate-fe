import { Layout } from "antd";
import logo from "./assets/logo.png"


const {Header}=Layout



export const AppHeaderSkeleton=()=>{
    return (
        <Header  className="app-header">
                 <div className="app-header__logo-search-section">
          <div className="app-header__logo">
      
              <img src={logo} alt="App logo" />
         
          </div>

          <div className="app-header__search-input">
            {/* <Search
              placeholder="Search 'San Fransisco'"
              enterButton
              onSearch={onSearch}
              value={search}
              onChange={e => setSearch(e.target.value)}
            /> */}
          </div>
        </div>
        </Header>
    )
}