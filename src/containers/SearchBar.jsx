import * as React from "react";
import {updateKey} from "../redux/search";
import {TextField} from "material-ui";
import {Search} from "material-ui-icons";
import {connect} from "react-redux";

const SearchBar = ({searchKey, dispatch}) => (
    <TextField
        fullWidth
        label={"搜索"}
        InputProps={{
            startAdornment: <Search/>,
        }}
        helperText="卡号/姓名/缩写/电话"
        value={searchKey}
        onChange={e => dispatch(updateKey(e.target.value))}
    />
);

const selector = state => ({
    searchKey: state.search.key
});

export default connect(selector)(SearchBar);