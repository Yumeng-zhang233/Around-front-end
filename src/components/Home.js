import React, { useState, useEffect } from "react";
import { Tabs, message, Row, Col, Button } from "antd";
import axios from "axios";

import SearchBar from "./SearchBar";
import PhotoGallery from "./PhotoGallery";
import CreatePostButton from "./CreatePostButton";
import { SEARCH_KEY, BASE_URL, TOKEN_KEY } from "../constants";

const { TabPane } = Tabs;

function Home(props) {
    const [posts, setPost] = useState([]);
    const [activeTab, setActiveTab] = useState("image");
    const [searchOption, setSearchOption] = useState({
        type: SEARCH_KEY.all,
        keyword: ""
    });
    const handleSearch = (option) => {
        const { type, keyword } = option;
        setSearchOption({ type: type, keyword: keyword });
    };

    //how to get posts from the server
    //didMount + didUpdate
    useEffect(() => {
        //do search the first time => didMount => search:{type:all, value: ")
        //after the first time => didUpdate => search :{type: keyword/user, value:keyword}
        const { type, keyword } = searchOption;
        fetchPost(searchOption);
    }, [searchOption]);

    const fetchPost = (option) => {
        //get search option
        //make a request to the server to fetch
        const { type, keyword } = option;
        //define url
        let url = "";
        //all
        //keyword
        //user
        if (type === SEARCH_KEY.all) {
            url = `${BASE_URL}/search`;
        } else if (type === SEARCH_KEY.user) {
            url = `${BASE_URL}/search?user=${keyword}`;
        } else {
            url = `${BASE_URL}/search?keywords=${keyword}`;
        }
        // config opt for axios request
        const opt = {
            method: "GET",
            url: url,
            headers: {
                Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`
            }
        };
        //send request: if  success, print res; if fail: print message
        axios(opt)
            .then((res) => {
                if (res.status === 200) {
                    setPost(res.data);
                }
            })
            .catch((err) => {
                message.error("Fetch posts failed!");
                console.log("fetch posts failed: ", err.message);
            });
    };

    const renderPosts = (type) => {
        //case1: type = image
        //case2: type = video
        if (!posts || posts.length === 0) {
            return <div>No data!</div>;
        }
        if (type === "image") {
            //prepare image data
            const imageArr = posts
                .filter((item) => item.type === "image")
                .map((image) => {
                    return {
                        postId: image.id,
                        src: image.url,
                        user: image.user,
                        //title
                        caption: image.message,
                        thumbnail: image.url,
                        thumbnailWidth: 300,
                        thumbnailHeight: 200
                    };
                });
            return <PhotoGallery images={imageArr} />;
        } else if (type === "video") {
            console.log("video -> ", posts);
            return (
                <Row gutter={32}>
                    {
                        posts
                        .filter((post) => post.type === "video")
                        .map((post) => (
                            //一行显示3个video
                            <Col span={8} key={post.url}>
                                <video src={post.url} controls={true} className="video-block" />
                                <p>
                                    {post.user}: {post.message}
                                </p>
                            </Col>
                        ))}
                </Row>
            );
        }
    };

    const operations = <CreatePostButton />;
    return (
        <div className="home">
            <SearchBar handleSearch={handleSearch}/>
            <div className="display">
                <Tabs
                    onChange={(key) => setActiveTab(key)}
                    defaultActiveKey="image"
                    activeKey={activeTab}
                    tabBarExtraContent={operations}
                >
                    <TabPane tab="Images" key="image">
                        {renderPosts("image")}
                    </TabPane>
                    <TabPane tab="Videos" key="video">
                        {renderPosts("video")}
                    </TabPane>
                </Tabs>
            </div>
        </div>
    );
}

export default Home;
