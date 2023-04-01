import { configureStore } from "@reduxjs/toolkit";
import main from "./reducers/main.reducer";

export default configureStore({
  reducer: {
    main
  }
})