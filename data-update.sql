--
-- PostgreSQL database dump
--

\restrict iw0j2PixYhbnnqNeRpjmc1txSQoDJzOfjgR0qxDdlpwyX5pdtD4E7GK2S42ICaS

-- Dumped from database version 16.13 (Homebrew)
-- Dumped by pg_dump version 16.13 (Homebrew)

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

--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: kycin
--

COPY public.products (id, name, slug, category, description, "descriptionJa", specs, pricing, "priceHourly", "priceMonthly", stock, status, featured, images, "createdAt", "updatedAt") FROM stdin;
cmmpsikqx00074a2gka0dt1wh	RTX 4090 Single	rtx-4090-single	Inference	Single RTX 4090 for development, testing, and small-scale inference workloads.	用于开发、测试和小规模推理工作负载的单个RTX 4090。	{"cpu": "AMD EPYC 7763 32 cores", "gpu": "NVIDIA RTX 4090", "ram": "128GB DDR5", "vram": "24GB GDDR6X", "network": "100Gbps", "storage": "1TB NVMe Gen4", "datacenter": "Malaysia (KL)"}	{"hourly": 0.8, "monthly": 480}	0.8	480	50	ACTIVE	f	{}	2026-03-14 03:52:51.85	2026-03-14 03:52:51.85
cmmpsikqz00094a2grysxo43f	RTX 4080 SUPER	rtx-4080-super	Inference	Budget-friendly option for development and testing. Great for prototyping.	开发和测试的预算友好选项。非常适合原型制作。	{"cpu": "AMD EPYC 7763 16 cores", "gpu": "NVIDIA RTX 4080 SUPER", "ram": "64GB DDR5", "vram": "16GB GDDR6X", "network": "100Gbps", "storage": "512GB NVMe Gen4", "datacenter": "Malaysia (KL)"}	{"hourly": 0.5, "monthly": 300}	0.5	300	50	ACTIVE	f	{}	2026-03-14 03:52:51.852	2026-03-14 03:52:51.852
cmmpsikqv00054a2gjiol982h	RTX 4090 x4 - Japan	rtx-4090-x4-japan	Training	4x RTX 4090 cluster in Tokyo. High性价比 for research, development, and prototyping AI models.	东京的4x RTX 4090集群。研究、开发和AI模型原型制作的高性价比。	{"cpu": "AMD EPYC 7763 64 cores", "gpu": "NVIDIA RTX 4090 (x4)", "ram": "256GB DDR5", "vram": "24GB GDDR6X (x4)", "network": "100Gbps", "storage": "2TB NVMe Gen4", "datacenter": "Japan (Tokyo)"}	{"hourly": 2.8, "monthly": 1680}	2.8	1680	10	ACTIVE	f	{}	2026-03-14 03:52:51.847	2026-03-14 03:52:51.847
cmmpsikqu00044a2gp1drrs2f	A100 80GB - Malaysia	a100-80gb-malaysia	AI Training	Proven A100 80GB for production AI workloads. Cost-effective solution with MIG technology.	用于生产AI工作负载的经验证的A100 80GB。带有MIG技术的成本效益解决方案。	{"cpu": "AMD EPYC 7763 64 cores", "gpu": "NVIDIA A100 80GB SXM", "ram": "256GB DDR4", "vram": "80GB HBM2e", "network": "100Gbps", "storage": "1TB NVMe Gen4", "datacenter": "Malaysia (KL)"}	{"hourly": 2, "monthly": 1200}	2	1200	15	ACTIVE	f	{}	2026-03-14 03:52:51.846	2026-03-14 03:52:51.846
cmmpsikqn00004a2gbkubde94	H100 80GB - Malaysia	h100-80gb-malaysia	AI Training	Industry-leading H100 80GB GPU in our Malaysia datacenter. Perfect for LLMs, transformer models, and enterprise AI workloads. Low latency for Southeast Asia.	马来西亚数据中心的HBM3内存行业领先AI培训GPU。优化用于大型语言模型和Transformer工作负载。	{"cpu": "Intel Xeon Platinum 8558 48 cores", "gpu": "NVIDIA H100 80GB SXM", "ram": "512GB DDR5", "vram": "80GB HBM3", "network": "100Gbps", "storage": "2TB NVMe Gen4", "datacenter": "Malaysia (KL)"}	{"hourly": 2.5, "monthly": 1500}	2.5	1500	20	ACTIVE	t	{}	2026-03-14 03:52:51.839	2026-03-14 03:52:51.839
cmmpsikqw00064a2gajaab9ep	RTX 4090 x8 - Malaysia	rtx-4090-x8-malaysia	AI Training	8x RTX 4090 cluster for deep learning training. Maximum performance for your budget.	用于深度学习培训的8x RTX 4090集群。在您的预算范围内获得最大性能。	{"cpu": "AMD EPYC 7763 64 cores", "gpu": "NVIDIA RTX 4090 (x8)", "ram": "512GB DDR5", "vram": "24GB GDDR6X (x8)", "network": "100Gbps", "storage": "4TB NVMe Gen4", "datacenter": "Malaysia (KL)"}	{"hourly": 1.5, "monthly": 900}	1.5	900	5	ACTIVE	t	{}	2026-03-14 03:52:51.848	2026-03-23 11:15:23.916
cmmpsikqq00014a2g897ycsaw	H100 80GB - Japan	h100-80gb-japan	AI Training	Premium H100 80GB in Tokyo datacenter. Ultra-low latency for Japan and East Asia. Enterprise-grade reliability.	东京数据中心的H100 80GB。日本和东亚的超低延迟。企业级可靠性。	{"cpu": "Intel Xeon Platinum 8558 48 cores", "gpu": "NVIDIA H100 80GB SXM", "ram": "512GB DDR5", "vram": "80GB HBM3", "network": "100Gbps", "storage": "2TB NVMe Gen4", "datacenter": "Japan (Tokyo)"}	{"hourly": 2.8, "monthly": 1680}	2.8	1680	15	ACTIVE	t	{}	2026-03-14 03:52:51.842	2026-03-14 03:52:51.842
cmmpsikqr00024a2g0tegsmp1	H100 80GB - Indonesia	h100-80gb-indonesia	AI Training	H100 80GB hosted in Jakarta datacenter. Ideal for Southeast Asian deployments with excellent regional connectivity.	雅加达数据中心的H100 80GB。非常适合东南亚部署，区域连接优秀。	{"cpu": "Intel Xeon Platinum 8558 48 cores", "gpu": "NVIDIA H100 80GB SXM", "ram": "512GB DDR5", "vram": "80GB HBM3", "network": "100Gbps", "storage": "2TB NVMe Gen4", "datacenter": "Indonesia (Jakarta)"}	{"hourly": 2.5, "monthly": 1500}	2.5	1500	10	ACTIVE	f	{}	2026-03-14 03:52:51.844	2026-03-14 03:52:51.844
cmmpsikqy00084a2gzfsu8qkd	H100 Inference - Japan	h100-inference-japan	Inference	H100 optimized specifically for inference. Lower cost per token with vLLM deployment.	专门为推理优化的H100。使用vLLM部署降低每个token的成本。	{"cpu": "Intel Xeon Platinum 8558 48 cores", "gpu": "NVIDIA H100 80GB", "ram": "256GB DDR5", "vram": "80GB HBM3", "network": "100Gbps", "storage": "1TB NVMe Gen4", "datacenter": "Japan (Tokyo)"}	{"hourly": 1.8, "monthly": 1080}	1.8	1080	30	ACTIVE	f	{}	2026-03-14 03:52:51.851	2026-03-14 03:52:51.851
cmmpsikqs00034a2gdj1v4ofb	H200 141GB - Japan	h200-141gb-japan	AI Training	Next-gen H200 with 141GB HBM3e memory in Tokyo. Designed for the largest models and longest context windows.	东京的下一代H200，配备141GB HBM3e内存。为最大模型和最长上下文窗口设计。	{"cpu": "AMD EPYC 9755 128 cores", "gpu": "NVIDIA H200 141GB SXM", "ram": "512GB DDR5", "vram": "141GB HBM3e", "network": "400Gbps", "storage": "2TB NVMe Gen5", "datacenter": "Japan (Tokyo)"}	{"hourly": 3.5, "monthly": 2100}	3.5	2100	8	ACTIVE	t	{}	2026-03-14 03:52:51.845	2026-03-14 03:52:51.845
cmn32jssr0000ljle86r0f4z9	RTX 4080 SUPER - Indonesia	rtx-4080-super-indonesia	Inference	Budget-friendly option for development and testing in Indonesia.	\N	{"cpu": "AMD EPYC 7763 16 cores", "gpu": "NVIDIA RTX 4080 SUPER", "ram": "64GB DDR5", "vram": "16GB GDDR6X", "network": "100Gbps", "storage": "512GB NVMe Gen4", "datacenter": "Indonesia (Jakarta)"}	{"hourly": 0.5, "monthly": 300}	0.5	300	50	ACTIVE	f	\N	2026-03-23 10:54:45.388	2026-03-23 10:54:45.388
cmn32jssx0001ljle69rcx6rj	RTX 4090 Single - Indonesia	rtx-4090-single-indonesia	Inference	Single RTX 4090 for development, testing, and small-scale inference in Indonesia.	\N	{"cpu": "AMD EPYC 7763 32 cores", "gpu": "NVIDIA RTX 4090", "ram": "128GB DDR5", "vram": "24GB GDDR6X", "network": "100Gbps", "storage": "1TB NVMe Gen4", "datacenter": "Indonesia (Jakarta)"}	{"hourly": 0.8, "monthly": 480}	0.8	480	50	ACTIVE	f	\N	2026-03-23 10:54:45.393	2026-03-23 10:54:45.393
cmn32jssx0002ljle6g53n5s4	RTX 4080 SUPER - Japan	rtx-4080-super-japan	Inference	Budget-friendly option for development and testing in Japan.	\N	{"cpu": "AMD EPYC 7763 16 cores", "gpu": "NVIDIA RTX 4080 SUPER", "ram": "64GB DDR5", "vram": "16GB GDDR6X", "network": "100Gbps", "storage": "512GB NVMe Gen4", "datacenter": "Japan (Tokyo)"}	{"hourly": 0.5, "monthly": 300}	0.5	300	50	ACTIVE	f	\N	2026-03-23 10:54:45.394	2026-03-23 10:54:45.394
cmn32jssy0003ljlefnjajc8h	RTX 4090 Single - Japan	rtx-4090-single-japan	Inference	Single RTX 4090 for development, testing, and small-scale inference in Japan.	\N	{"cpu": "AMD EPYC 7763 32 cores", "gpu": "NVIDIA RTX 4090", "ram": "128GB DDR5", "vram": "24GB GDDR6X", "network": "100Gbps", "storage": "1TB NVMe Gen4", "datacenter": "Japan (Tokyo)"}	{"hourly": 0.8, "monthly": 480}	0.8	480	50	ACTIVE	f	\N	2026-03-23 10:54:45.394	2026-03-23 10:54:45.394
cmn338rra00002gp52bj5ermx	H200 141GB - Malaysia	h200-141gb-malaysia	AI Training	Next-gen H200 with 141GB HBM3e memory in Malaysia (KL). Designed for the largest models and longest context windows.	\N	{"cpu": "AMD EPYC 9755 128 cores", "gpu": "NVIDIA H200 141GB SXM", "ram": "512GB DDR5", "vram": "141GB HBM3e", "network": "400Gbps", "storage": "2TB NVMe Gen5", "datacenter": "Malaysia (KL)"}	{"hourly": 3.5, "monthly": 2100}	3.5	2100	8	ACTIVE	t	\N	2026-03-23 11:14:10.438	2026-03-23 11:14:10.438
cmn338rre00012gp5k9vl31bo	H200 141GB - Indonesia	h200-141gb-indonesia	AI Training	Next-gen H200 with 141GB HBM3e memory in Indonesia (Jakarta). Designed for the largest models and longest context windows.	\N	{"cpu": "AMD EPYC 9755 128 cores", "gpu": "NVIDIA H200 141GB SXM", "ram": "512GB DDR5", "vram": "141GB HBM3e", "network": "400Gbps", "storage": "2TB NVMe Gen5", "datacenter": "Indonesia (Jakarta)"}	{"hourly": 3.5, "monthly": 2100}	3.5	2100	8	ACTIVE	t	\N	2026-03-23 11:14:10.443	2026-03-23 11:14:10.443
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: kycin
--

COPY public.users (id, email, password, name, avatar, role, balance, "emailVerified", "verificationCode", "verificationExpiry", "createdAt", "updatedAt") FROM stdin;
cmmpsikxw000a4a2gitailqen	admin@suncityd.com	$2a$12$7vApamhc/Uve6iq2K6gxdOa3CyqKnaZs8W.nSNjy6VDWyLF9AU1ye	Admin	\N	ADMIN	1000	f	\N	\N	2026-03-14 03:52:52.1	2026-03-14 03:52:52.1
cmmpsm7h3000013jnfsr4i0d3	liurui@cloudta.com.cn	$2a$12$JEMH6KuyyJ4vN7lsI5ola.In01DbtIYYYLEDIPqMH2RZHGPWawaGu	liu	\N	USER	0	f	\N	\N	2026-03-14 03:55:41.271	2026-03-14 03:55:41.271
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: kycin
--

COPY public.orders (id, "userId", "productId", type, amount, status, "instanceId", metadata, "createdAt", "paidAt") FROM stdin;
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: public; Owner: kycin
--

COPY public.instances (id, "orderId", "userId", "productId", status, ip, port, "sshKey", password, "startedAt", "expiresAt", "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: kycin
--

COPY public.transactions (id, "userId", type, amount, balance, description, "createdAt") FROM stdin;
\.


--
-- PostgreSQL database dump complete
--

\unrestrict iw0j2PixYhbnnqNeRpjmc1txSQoDJzOfjgR0qxDdlpwyX5pdtD4E7GK2S42ICaS

