
import UserDetail from "./components/UserDetail";
import Todos from "./components/Todos";
import { useSelector} from 'react-redux/es/exports';

function App() {
  const show = useSelector(state=>state.showUser.showUser);
  return (
    <div class="container">
    <div class="row">
       <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      <Todos/>
      </div>
       <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6">
      {show && <UserDetail/>}
      </div>
   </div>
   </div>
  );
}

export default App;
