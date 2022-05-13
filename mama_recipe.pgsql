--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    recipe_id character varying(255) NOT NULL,
    comment_text text NOT NULL,
    is_active integer NOT NULL,
    created_at time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at time without time zone,
    deleted_at time without time zone
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: liked_recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.liked_recipes (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    recipe_id character varying(255) NOT NULL,
    created_at time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.liked_recipes OWNER TO postgres;

--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    id character varying(255) NOT NULL,
    title character varying(255) NOT NULL,
    image text,
    ingredients text NOT NULL,
    video text,
    is_active integer NOT NULL,
    user_id character varying(255) NOT NULL,
    created_at time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at time without time zone,
    deleted_at time without time zone
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: saved_recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.saved_recipes (
    id character varying(255) NOT NULL,
    user_id character varying(255) NOT NULL,
    recipe_id character varying(255) NOT NULL,
    created_at time without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.saved_recipes OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    email character varying(255),
    password character varying(255),
    phone character varying(255),
    image character varying(255),
    level integer,
    is_verified integer,
    is_active integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.comments (id, user_id, recipe_id, comment_text, is_active, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: liked_recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.liked_recipes (id, user_id, recipe_id, created_at) FROM stdin;
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (id, title, image, ingredients, video, is_active, user_id, created_at, updated_at, deleted_at) FROM stdin;
\.


--
-- Data for Name: saved_recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.saved_recipes (id, user_id, recipe_id, created_at) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, password, phone, image, level, is_verified, is_active) FROM stdin;
\.


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: liked_recipes liked_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.liked_recipes
    ADD CONSTRAINT liked_recipes_pkey PRIMARY KEY (id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (id);


--
-- Name: saved_recipes saved_recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.saved_recipes
    ADD CONSTRAINT saved_recipes_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

