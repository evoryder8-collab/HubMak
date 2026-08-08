/* ==========================================================================
   Site translations
   ========================================================================== */

(function () {
  'use strict';

  var copy = {
    en: {
      meta_title: 'Hubert Mak | Massage Champion, Manual Osteopath',
      meta_description: 'Hubert Mak is a Registered Massage Therapist and Manual Osteopath in Markham, Ontario, and the 2026 International Division Overall Winner in Paris.',
      skip: 'Skip to content', nav_approach: 'Approach', nav_awards: 'Awards', nav_gallery: 'Gallery', nav_contact: 'Contact', nav_language: 'Change language',
      rail_film: 'Film', rail_approach: 'Approach', rail_awards: 'Awards', rail_moments: 'Moments', rail_contact: 'Contact',
      hero_eyebrow: 'Registered care · International results', hero_statement: 'Care, strength, and precision in every treatment.',
      hero_role_one: 'Registered Massage Therapist', hero_role_two: 'Manual Osteopath', hero_role_three: 'Founder of MakCare',
      hero_award_label: '2026 Overall Winner', hero_award_title: 'International Division', hero_award_place: 'Euro Massage Championship · Paris', hero_scroll: 'Scroll',
      proof_one: 'Paris · International Division Overall Winner', proof_two: 'Laval · Sports Category Silver', proof_three: 'Markham · MakCare Health and Wellness',
      book_eyebrow: 'Treatment in Markham', book_title: 'Ready to feel and move better?', book_button: 'Book a massage',
      film_aria: 'Film', film_chapter: 'In Motion', film_video_alt: 'Hubert Mak at the Euro Massage Championship 2026', sound_on: 'Turn sound on', sound_off: 'Turn sound off', film_caption: 'A minute inside the work.',
      craft_chapter: 'Approach', craft_title: 'The Work Behind the Results', craft_stage_note: 'Clinical training · Thai massage · Stretch therapy · Acupuncture',
      craft_p1: 'Hubert Mak is a Registered Massage Therapist and Manual Osteopath based in Markham. His work brings clinical training together with Thai massage, stretch therapy, acupuncture, and years of hands-on experience.',
      craft_p2: 'He founded MakCare Health and Wellness Centre to bring those methods into one practical approach. Each treatment starts with the person in front of him: understand what the body needs, choose the right method, and help the client move and feel better.',
      craft_inset_caption: 'Care starts with attention.',
      craft_p3: 'The same focus shapes his competition work. In 2026, Hubert earned silver in the Sports Category in Laval, then took the International Division overall title in Paris. Those results reflect years of practice, preparation, and clear decisions under pressure.',
      craft_p4: 'He continues to treat, study, and refine his technique. The goal stays simple: deliver care that is skilled, attentive, and useful.',
      honors_chapter: 'Awards', honors_title: 'Two Events. A Standout Season.', honors_lede: 'Sports Category silver in Laval and the International Division overall title in Paris, both in 2026.',
      honors_scene_caption: 'Paris, 2026', honors_scene_note: 'The result, shared with Team Canada.', laval_medal: 'Silver Medal',
      laval_rank: 'Second Place', laval_name: 'Sports Category', laval_note: 'Hubert took silver in the Sports Category at the Massage Therapy Summit in Laval.',
      paris_rank: 'Overall Winner', paris_name: 'International Division', paris_note: 'Named the top therapist across the International Division.',
      empathy_rank: 'Empathy Award', empathy_name: 'Sport Massage', empathy_note: 'Recognized for the care, attention, and communication shown during treatment.',
      photo_rank: 'Second Place', photo_name: 'Best Massage Photo', photo_note: 'Second place for an image that captured the quality of the work.',
      multi_rank: 'Multiple Top Placements', multi_name: 'Sport Massage and Western Traditions', multi_note: 'Strong results across sport massage and Western-inspired categories.',
      gallery_chapter: 'In Practice', gallery_1: 'Focus at the table.', gallery_2: 'Thai technique in competition.', gallery_3: 'Controlled strength and range.', gallery_4: 'Support through the neck and shoulders.', gallery_5: 'Careful shoulder work.', gallery_6: 'Cupping with assisted stretch.', gallery_7: 'Using balance and body weight.', gallery_8: 'Restoring range through movement.', gallery_9: 'Full attention at the table.', gallery_10: "Working at the client's level.", gallery_hint: 'Swipe or drag to explore',
      creed_aria: 'Philosophy', creed_quote: 'Technique matters. Connection makes it work.',
      contact_chapter: 'Contact', contact_title: "Let's Talk", contact_lede: "For appointments, seminars, media, or questions about Hubert's work.", contact_email_label: 'Direct email', contact_phone_label: 'Telephone',
      form_name: 'Name', form_email: 'Email', form_message: 'Message', form_send: 'Send', form_validation: 'Please add your name, a valid email, and a message.', form_opening: 'Opening your mail app.',
      footer_place: 'Markham, Ontario, Canada', lightbox_aria: 'Image viewer', lightbox_close: 'Close viewer', lightbox_prev: 'Previous image', lightbox_next: 'Next image',
      alt_medal: 'Hubert Mak receiving his gold medal in Paris', alt_craft: 'Hubert Mak performing a Thai stretch during competition', alt_connection: "Hubert Mak supporting a client's head during treatment", alt_celebration: 'Hubert Mak celebrating with Team Canada in Paris', alt_treatment: 'Hubert Mak performing massage treatment'
    },

    fr: {
      meta_title: 'Hubert Mak | Champion de massage et ostéopathe manuel',
      meta_description: "Hubert Mak est massothérapeute agréé et ostéopathe manuel à Markham, en Ontario, et grand gagnant de la division internationale 2026 à Paris.",
      skip: 'Aller au contenu', nav_approach: 'Approche', nav_awards: 'Prix', nav_gallery: 'Galerie', nav_contact: 'Contact', nav_language: 'Changer de langue',
      rail_film: 'Film', rail_approach: 'Approche', rail_awards: 'Prix', rail_moments: 'Moments', rail_contact: 'Contact',
      hero_eyebrow: 'Soins agréés · Résultats internationaux', hero_statement: 'Soin, force et précision dans chaque traitement.',
      hero_role_one: 'Massothérapeute agréé', hero_role_two: 'Ostéopathe manuel', hero_role_three: 'Fondateur de MakCare',
      hero_award_label: 'Grand gagnant 2026', hero_award_title: 'Division internationale', hero_award_place: 'Euro Massage Championship · Paris', hero_scroll: 'Défiler',
      proof_one: 'Paris · Grand gagnant de la division internationale', proof_two: 'Laval · Argent en catégorie sportive', proof_three: 'Markham · MakCare Santé et Bien-être',
      book_eyebrow: 'Soins à Markham', book_title: 'Prêt à mieux bouger et vous sentir mieux ?', book_button: 'Réserver un massage',
      film_aria: 'Film', film_chapter: 'En mouvement', film_video_alt: "Hubert Mak à l'Euro Massage Championship 2026", sound_on: 'Activer le son', sound_off: 'Couper le son', film_caption: 'Une minute au cœur de son travail.',
      craft_chapter: 'Approche', craft_title: 'Le travail derrière les résultats', craft_stage_note: 'Formation clinique · Massage thaï · Thérapie par étirement · Acupuncture',
      craft_p1: "Hubert Mak est massothérapeute agréé et ostéopathe manuel à Markham. Son travail réunit formation clinique, massage thaï, thérapie par étirement, acupuncture et plusieurs années d'expérience pratique.",
      craft_p2: "Il a fondé le centre MakCare Health and Wellness pour réunir ces méthodes dans une approche concrète. Chaque traitement part de la personne devant lui : comprendre les besoins du corps, choisir la bonne méthode et aider le client à mieux bouger et à se sentir mieux.",
      craft_inset_caption: "Le soin commence par l'attention.",
      craft_p3: "La même concentration guide son travail en compétition. En 2026, Hubert a obtenu l'argent dans la catégorie sportive à Laval, puis a remporté le titre général de la division internationale à Paris. Ces résultats viennent de plusieurs années de pratique, de préparation et de décisions précises sous pression.",
      craft_p4: "Il continue de traiter, d'étudier et d'affiner sa technique. Le but reste simple : offrir des soins compétents, attentifs et utiles.",
      honors_chapter: 'Prix', honors_title: 'Deux événements. Une saison marquante.', honors_lede: "Une médaille d'argent dans la catégorie sportive à Laval et le titre général de la division internationale à Paris, tous deux en 2026.",
      honors_scene_caption: 'Paris, 2026', honors_scene_note: "Le résultat, partagé avec l'équipe canadienne.", laval_medal: "Médaille d'argent",
      laval_rank: 'Deuxième place', laval_name: 'Catégorie sportive', laval_note: "Hubert a remporté l'argent dans la catégorie sportive au Massage Therapy Summit de Laval.",
      paris_rank: 'Grand gagnant', paris_name: 'Division internationale', paris_note: 'Nommé meilleur thérapeute de la division internationale.',
      empathy_rank: "Prix de l'empathie", empathy_name: 'Massage sportif', empathy_note: "Récompensé pour le soin, l'attention et la communication montrés pendant le traitement.",
      photo_rank: 'Deuxième place', photo_name: 'Meilleure photo de massage', photo_note: 'Deuxième place pour une image qui montre la qualité du travail.',
      multi_rank: 'Plusieurs classements de tête', multi_name: 'Massage sportif et traditions occidentales', multi_note: "De très bons résultats en massage sportif et dans les catégories d'inspiration occidentale.",
      gallery_chapter: 'En pratique', gallery_1: 'Concentration à la table.', gallery_2: 'Technique thaï en compétition.', gallery_3: 'Force et amplitude maîtrisées.', gallery_4: 'Soutien du cou et des épaules.', gallery_5: 'Travail précis des épaules.', gallery_6: 'Ventouses et étirement assisté.', gallery_7: 'Équilibre et poids du corps.', gallery_8: "Retrouver de l'amplitude par le mouvement.", gallery_9: 'Une attention totale à la table.', gallery_10: 'Travailler au niveau du client.', gallery_hint: 'Balayez ou faites glisser',
      creed_aria: 'Philosophie', creed_quote: 'La technique compte. La connexion la rend efficace.',
      contact_chapter: 'Contact', contact_title: 'Parlons-en', contact_lede: 'Pour un rendez-vous, un séminaire, les médias ou une question sur le travail de Hubert.', contact_email_label: 'E-mail direct', contact_phone_label: 'Téléphone',
      form_name: 'Nom', form_email: 'E-mail', form_message: 'Message', form_send: 'Envoyer', form_validation: 'Ajoutez votre nom, une adresse e-mail valide et un message.', form_opening: 'Ouverture de votre messagerie.',
      footer_place: 'Markham, Ontario, Canada', lightbox_aria: "Visionneuse d'images", lightbox_close: 'Fermer', lightbox_prev: 'Image précédente', lightbox_next: 'Image suivante',
      alt_medal: "Hubert Mak reçoit sa médaille d'or à Paris", alt_craft: 'Hubert Mak réalise un étirement thaï en compétition', alt_connection: "Hubert Mak soutient la tête d'un client pendant un traitement", alt_celebration: "Hubert Mak célèbre avec l'équipe canadienne à Paris", alt_treatment: 'Hubert Mak réalise un traitement de massage'
    },

    yue: {
      meta_title: 'Hubert Mak | 按摩冠軍及手法整骨治療師',
      meta_description: 'Hubert Mak 是安大略省萬錦市的註冊按摩治療師及手法整骨治療師，亦是 2026 年巴黎國際組總冠軍。',
      skip: '跳到主要內容', nav_approach: '手法', nav_awards: '獎項', nav_gallery: '相集', nav_contact: '聯絡', nav_language: '更改語言',
      rail_film: '影片', rail_approach: '手法', rail_awards: '獎項', rail_moments: '時刻', rail_contact: '聯絡',
      hero_eyebrow: '註冊專業 · 國際成績', hero_statement: '每次治療，都結合關懷、力量與精準。',
      hero_role_one: '註冊按摩治療師', hero_role_two: '手法整骨治療師', hero_role_three: 'MakCare 創辦人',
      hero_award_label: '2026 總冠軍', hero_award_title: '國際組', hero_award_place: '歐洲按摩錦標賽 · 巴黎', hero_scroll: '向下捲動',
      proof_one: '巴黎 · 國際組總冠軍', proof_two: '拉瓦爾 · 運動組銀牌', proof_three: '萬錦市 · MakCare 健康及保健中心',
      book_eyebrow: '萬錦市治療', book_title: '準備好活動得更好、感覺更舒服？', book_button: '預約按摩',
      film_aria: '影片', film_chapter: '動態紀錄', film_video_alt: 'Hubert Mak 參加 2026 歐洲按摩錦標賽', sound_on: '開啟聲音', sound_off: '關閉聲音', film_caption: '一分鐘，走進他的工作。',
      craft_chapter: '手法', craft_title: '成績背後的實力', craft_stage_note: '臨床訓練 · 泰式按摩 · 伸展治療 · 針灸',
      craft_p1: 'Hubert Mak 是駐於萬錦市的註冊按摩治療師及手法整骨治療師。他將臨床訓練、泰式按摩、伸展治療、針灸同多年實務經驗結合起來。',
      craft_p2: '他創立 MakCare 健康及保健中心，將不同方法整合成實際而清晰的治療方式。每次治療都由面前的客人開始：了解身體需要，選擇合適方法，幫助客人活動得更好，感覺更舒服。',
      craft_inset_caption: '照顧，由專注開始。',
      craft_p3: '同一份專注亦帶到比賽場上。2026 年，Hubert 先在拉瓦爾運動組取得銀牌，再於巴黎取得國際組總冠軍。成績來自多年練習、充分準備，同壓力下的清晰判斷。',
      craft_p4: '他繼續治療、學習同改進技術。目標一直簡單：提供專業、細心而真正有用的照顧。',
      honors_chapter: '獎項', honors_title: '兩場比賽。出色的一季。', honors_lede: '2026 年於拉瓦爾取得運動組銀牌，並在巴黎贏得國際組總冠軍。',
      honors_scene_caption: '巴黎，2026', honors_scene_note: '同加拿大隊一齊分享成果。', laval_medal: '銀牌',
      laval_rank: '第二名', laval_name: '運動組', laval_note: 'Hubert 在拉瓦爾 Massage Therapy Summit 的運動組取得銀牌。',
      paris_rank: '總冠軍', paris_name: '國際組', paris_note: '獲選為國際組最佳治療師。',
      empathy_rank: '同理心獎', empathy_name: '運動按摩', empathy_note: '表揚治療過程中的關懷、專注同溝通。',
      photo_rank: '第二名', photo_name: '最佳按摩照片', photo_note: '以一張呈現工作質素的照片取得第二名。',
      multi_rank: '多項前列名次', multi_name: '運動按摩及西方傳統', multi_note: '在運動按摩及西方手法組別取得優秀成績。',
      gallery_chapter: '治療現場', gallery_1: '專注於治療床。', gallery_2: '比賽中的泰式手法。', gallery_3: '受控的力量同幅度。', gallery_4: '承托頸部同肩膊。', gallery_5: '細心處理肩膊。', gallery_6: '拔罐配合輔助伸展。', gallery_7: '運用平衡同身體重量。', gallery_8: '透過動作回復活動幅度。', gallery_9: '全心專注於治療。', gallery_10: '配合客人的高度工作。', gallery_hint: '左右滑動查看更多',
      creed_aria: '理念', creed_quote: '技術重要。連結令治療真正發揮作用。',
      contact_chapter: '聯絡', contact_title: '傾一傾', contact_lede: '預約、講座、媒體或有關 Hubert 工作的查詢，歡迎聯絡。', contact_email_label: '直接電郵', contact_phone_label: '電話',
      form_name: '姓名', form_email: '電郵', form_message: '訊息', form_send: '傳送', form_validation: '請填寫姓名、有效電郵同訊息。', form_opening: '正在開啟你的電郵程式。',
      footer_place: '加拿大安大略省萬錦市', lightbox_aria: '圖片檢視器', lightbox_close: '關閉', lightbox_prev: '上一張圖片', lightbox_next: '下一張圖片',
      alt_medal: 'Hubert Mak 在巴黎接受金牌', alt_craft: 'Hubert Mak 在比賽中進行泰式伸展', alt_connection: 'Hubert Mak 在治療中承托客人的頭部', alt_celebration: 'Hubert Mak 在巴黎同加拿大隊慶祝', alt_treatment: 'Hubert Mak 進行按摩治療'
    },

    zh: {
      meta_title: 'Hubert Mak | 按摩冠军及手法整骨治疗师',
      meta_description: 'Hubert Mak 是安大略省万锦市的注册按摩治疗师和手法整骨治疗师，也是 2026 年巴黎国际组总冠军。',
      skip: '跳到主要内容', nav_approach: '方法', nav_awards: '奖项', nav_gallery: '图库', nav_contact: '联系', nav_language: '更改语言',
      rail_film: '影片', rail_approach: '方法', rail_awards: '奖项', rail_moments: '时刻', rail_contact: '联系',
      hero_eyebrow: '注册专业 · 国际成绩', hero_statement: '每次治疗都兼顾关怀、力量与精准。',
      hero_role_one: '注册按摩治疗师', hero_role_two: '手法整骨治疗师', hero_role_three: 'MakCare 创始人',
      hero_award_label: '2026 总冠军', hero_award_title: '国际组', hero_award_place: '欧洲按摩锦标赛 · 巴黎', hero_scroll: '向下滚动',
      proof_one: '巴黎 · 国际组总冠军', proof_two: '拉瓦尔 · 运动组银牌', proof_three: '万锦市 · MakCare 健康与保健中心',
      book_eyebrow: '万锦市治疗', book_title: '准备好改善活动和感受了吗？', book_button: '预约按摩',
      film_aria: '影片', film_chapter: '动态记录', film_video_alt: 'Hubert Mak 参加 2026 欧洲按摩锦标赛', sound_on: '打开声音', sound_off: '关闭声音', film_caption: '一分钟，走进他的工作。',
      craft_chapter: '方法', craft_title: '成绩背后的专业', craft_stage_note: '临床训练 · 泰式按摩 · 拉伸治疗 · 针灸',
      craft_p1: 'Hubert Mak 是一位在万锦市执业的注册按摩治疗师和手法整骨治疗师。他把临床训练、泰式按摩、拉伸治疗、针灸和多年的实践经验结合起来。',
      craft_p2: '他创立 MakCare 健康与保健中心，将这些方法整合成实用而清晰的治疗方式。每次治疗都从眼前的人开始：了解身体需要，选择合适方法，帮助客户改善活动和感受。',
      craft_inset_caption: '关怀始于专注。',
      craft_p3: '同样的专注也贯穿他的比赛表现。2026 年，Hubert 先在拉瓦尔运动组获得银牌，随后在巴黎赢得国际组总冠军。这些成绩来自多年的练习、充分的准备，以及压力下清晰的判断。',
      craft_p4: '他继续治疗、学习并改进技术。目标始终简单：提供专业、细致且真正有用的照护。',
      honors_chapter: '奖项', honors_title: '两场比赛。出色的一季。', honors_lede: '2026 年在拉瓦尔获得运动组银牌，并在巴黎赢得国际组总冠军。',
      honors_scene_caption: '巴黎，2026', honors_scene_note: '与加拿大队共同分享成果。', laval_medal: '银牌',
      laval_rank: '第二名', laval_name: '运动组', laval_note: 'Hubert 在拉瓦尔 Massage Therapy Summit 的运动组获得银牌。',
      paris_rank: '总冠军', paris_name: '国际组', paris_note: '获评国际组最佳治疗师。',
      empathy_rank: '同理心奖', empathy_name: '运动按摩', empathy_note: '表彰治疗过程中的关怀、专注与沟通。',
      photo_rank: '第二名', photo_name: '最佳按摩照片', photo_note: '凭一张展现工作质量的照片获得第二名。',
      multi_rank: '多项前列名次', multi_name: '运动按摩与西方传统', multi_note: '在运动按摩及西方手法类别中取得优异成绩。',
      gallery_chapter: '治疗现场', gallery_1: '专注于治疗台。', gallery_2: '比赛中的泰式手法。', gallery_3: '受控的力量与幅度。', gallery_4: '支撑颈部和肩部。', gallery_5: '细致的肩部治疗。', gallery_6: '拔罐配合辅助拉伸。', gallery_7: '运用平衡和身体重量。', gallery_8: '通过动作恢复活动幅度。', gallery_9: '全心专注于治疗。', gallery_10: '配合客户的高度工作。', gallery_hint: '左右滑动查看更多',
      creed_aria: '理念', creed_quote: '技术很重要。连接让治疗真正有效。',
      contact_chapter: '联系', contact_title: '聊一聊', contact_lede: '预约、讲座、媒体或有关 Hubert 工作的问题，欢迎联系。', contact_email_label: '直接邮件', contact_phone_label: '电话',
      form_name: '姓名', form_email: '电子邮件', form_message: '留言', form_send: '发送', form_validation: '请填写姓名、有效电子邮件和留言。', form_opening: '正在打开您的邮件应用。',
      footer_place: '加拿大安大略省万锦市', lightbox_aria: '图片查看器', lightbox_close: '关闭', lightbox_prev: '上一张图片', lightbox_next: '下一张图片',
      alt_medal: 'Hubert Mak 在巴黎接受金牌', alt_craft: 'Hubert Mak 在比赛中进行泰式拉伸', alt_connection: 'Hubert Mak 在治疗中支撑客户的头部', alt_celebration: 'Hubert Mak 在巴黎与加拿大队庆祝', alt_treatment: 'Hubert Mak 进行按摩治疗'
    },

    ja: {
      meta_title: 'Hubert Mak | マッサージチャンピオン、徒手オステオパス',
      meta_description: 'Hubert Mak はオンタリオ州マーカムの登録マッサージセラピスト兼徒手オステオパスで、2026年パリ国際部門の総合優勝者です。',
      skip: '本文へ移動', nav_approach: 'アプローチ', nav_awards: '受賞歴', nav_gallery: 'ギャラリー', nav_contact: 'お問い合わせ', nav_language: '言語を変更',
      rail_film: '映像', rail_approach: 'アプローチ', rail_awards: '受賞歴', rail_moments: '場面', rail_contact: 'お問い合わせ',
      hero_eyebrow: '登録資格 · 国際的な実績', hero_statement: '一つひとつの施術に、思いやり、力、正確さを。',
      hero_role_one: '登録マッサージセラピスト', hero_role_two: '徒手オステオパス', hero_role_three: 'MakCare 創設者',
      hero_award_label: '2026年 総合優勝', hero_award_title: '国際部門', hero_award_place: 'ユーロ・マッサージ選手権 · パリ', hero_scroll: 'スクロール',
      proof_one: 'パリ · 国際部門総合優勝', proof_two: 'ラヴァル · スポーツ部門銀メダル', proof_three: 'マーカム · MakCare Health and Wellness',
      book_eyebrow: 'マーカムでの施術', book_title: 'もっと動きやすく、心地よい身体へ。', book_button: 'マッサージを予約',
      film_aria: '映像', film_chapter: '動きの中で', film_video_alt: '2026年ユーロ・マッサージ選手権での Hubert Mak', sound_on: '音声をオン', sound_off: '音声をオフ', film_caption: '施術の一分間。',
      craft_chapter: 'アプローチ', craft_title: '結果を支える仕事', craft_stage_note: '臨床トレーニング · タイマッサージ · ストレッチ療法 · 鍼治療',
      craft_p1: 'Hubert Mak はマーカムを拠点とする登録マッサージセラピスト兼徒手オステオパスです。臨床トレーニング、タイマッサージ、ストレッチ療法、鍼治療、そして長年の実務経験を組み合わせています。',
      craft_p2: 'これらの方法を実践的な一つのアプローチにまとめるため、MakCare Health and Wellness Centre を設立しました。施術は目の前の人から始まります。身体が何を必要としているかを見極め、適切な方法を選び、より動きやすく快適な状態へ導きます。',
      craft_inset_caption: 'ケアは注意深く見ることから始まります。',
      craft_p3: '同じ集中力が競技でも生かされています。2026年、Hubert はラヴァルのスポーツ部門で銀メダルを獲得し、その後パリで国際部門総合優勝を果たしました。結果を支えたのは、長年の練習、準備、そしてプレッシャーの中での明確な判断です。',
      craft_p4: '現在も施術、学習、技術の改善を続けています。目標は変わりません。高い技術と細やかな配慮を備えた、役に立つケアを届けることです。',
      honors_chapter: '受賞歴', honors_title: '二つの大会。際立った一年。', honors_lede: '2026年、ラヴァルでのスポーツ部門銀メダルとパリでの国際部門総合優勝。',
      honors_scene_caption: 'パリ、2026年', honors_scene_note: 'チームカナダと分かち合った結果。', laval_medal: '銀メダル',
      laval_rank: '第2位', laval_name: 'スポーツ部門', laval_note: 'Hubert はラヴァルの Massage Therapy Summit スポーツ部門で銀メダルを獲得しました。',
      paris_rank: '総合優勝', paris_name: '国際部門', paris_note: '国際部門のトップセラピストに選出。',
      empathy_rank: 'エンパシー賞', empathy_name: 'スポーツマッサージ', empathy_note: '施術中の配慮、注意、コミュニケーションが評価されました。',
      photo_rank: '第2位', photo_name: 'ベスト・マッサージ写真', photo_note: '施術の質を伝える一枚で第2位を獲得。',
      multi_rank: '複数部門で上位入賞', multi_name: 'スポーツマッサージと西洋式手技', multi_note: 'スポーツマッサージと西洋式カテゴリーで好成績を収めました。',
      gallery_chapter: '施術の現場', gallery_1: '施術台に集中。', gallery_2: '競技でのタイ式テクニック。', gallery_3: '制御された力と可動域。', gallery_4: '首と肩を支える。', gallery_5: '丁寧な肩への施術。', gallery_6: 'カッピングと補助ストレッチ。', gallery_7: 'バランスと体重を使う。', gallery_8: '動きによって可動域を戻す。', gallery_9: '施術台での完全な集中。', gallery_10: 'クライアントと同じ高さで。', gallery_hint: 'スワイプまたはドラッグ',
      creed_aria: '理念', creed_quote: '技術は大切です。つながりが技術を生かします。',
      contact_chapter: 'お問い合わせ', contact_title: 'お話ししましょう', contact_lede: '予約、セミナー、メディア、Hubert の仕事についてのご質問はこちらから。', contact_email_label: '直接メール', contact_phone_label: '電話',
      form_name: 'お名前', form_email: 'メール', form_message: 'メッセージ', form_send: '送信', form_validation: 'お名前、有効なメールアドレス、メッセージを入力してください。', form_opening: 'メールアプリを開いています。',
      footer_place: 'カナダ、オンタリオ州マーカム', lightbox_aria: '画像ビューア', lightbox_close: '閉じる', lightbox_prev: '前の画像', lightbox_next: '次の画像',
      alt_medal: 'パリで金メダルを受け取る Hubert Mak', alt_craft: '競技中にタイ式ストレッチを行う Hubert Mak', alt_connection: '施術中にクライアントの頭を支える Hubert Mak', alt_celebration: 'パリでチームカナダと祝う Hubert Mak', alt_treatment: 'マッサージ施術を行う Hubert Mak'
    },

    de: {
      meta_title: 'Hubert Mak | Massagechampion und manueller Osteopath',
      meta_description: 'Hubert Mak ist registrierter Massagetherapeut und manueller Osteopath in Markham, Ontario, sowie Gesamtsieger der internationalen Division 2026 in Paris.',
      skip: 'Zum Inhalt', nav_approach: 'Ansatz', nav_awards: 'Auszeichnungen', nav_gallery: 'Galerie', nav_contact: 'Kontakt', nav_language: 'Sprache ändern',
      rail_film: 'Film', rail_approach: 'Ansatz', rail_awards: 'Auszeichnungen', rail_moments: 'Momente', rail_contact: 'Kontakt',
      hero_eyebrow: 'Registrierte Behandlung · Internationale Erfolge', hero_statement: 'Sorgfalt, Kraft und Präzision in jeder Behandlung.',
      hero_role_one: 'Registrierter Massagetherapeut', hero_role_two: 'Manueller Osteopath', hero_role_three: 'Gründer von MakCare',
      hero_award_label: 'Gesamtsieger 2026', hero_award_title: 'Internationale Division', hero_award_place: 'Euro Massage Championship · Paris', hero_scroll: 'Scrollen',
      proof_one: 'Paris · Gesamtsieger der internationalen Division', proof_two: 'Laval · Silber in der Sportkategorie', proof_three: 'Markham · MakCare Health and Wellness',
      book_eyebrow: 'Behandlung in Markham', book_title: 'Bereit, sich besser zu bewegen und zu fühlen?', book_button: 'Massage buchen',
      film_aria: 'Film', film_chapter: 'In Bewegung', film_video_alt: 'Hubert Mak bei der Euro Massage Championship 2026', sound_on: 'Ton einschalten', sound_off: 'Ton ausschalten', film_caption: 'Eine Minute mitten in der Arbeit.',
      craft_chapter: 'Ansatz', craft_title: 'Die Arbeit hinter den Ergebnissen', craft_stage_note: 'Klinische Ausbildung · Thai-Massage · Dehntherapie · Akupunktur',
      craft_p1: 'Hubert Mak ist registrierter Massagetherapeut und manueller Osteopath in Markham. Seine Arbeit verbindet klinische Ausbildung mit Thai-Massage, Dehntherapie, Akupunktur und vielen Jahren praktischer Erfahrung.',
      craft_p2: 'Er gründete das MakCare Health and Wellness Centre, um diese Methoden in einem praktischen Ansatz zu vereinen. Jede Behandlung beginnt bei der Person vor ihm: verstehen, was der Körper braucht, die passende Methode wählen und dem Menschen helfen, sich besser zu bewegen und zu fühlen.',
      craft_inset_caption: 'Gute Behandlung beginnt mit Aufmerksamkeit.',
      craft_p3: 'Die gleiche Konzentration prägt seine Arbeit im Wettbewerb. 2026 gewann Hubert Silber in der Sportkategorie in Laval und anschließend den Gesamttitel der internationalen Division in Paris. Diese Ergebnisse beruhen auf jahrelanger Übung, Vorbereitung und klaren Entscheidungen unter Druck.',
      craft_p4: 'Er behandelt, lernt und verfeinert seine Technik weiter. Das Ziel bleibt einfach: kompetente, aufmerksame und hilfreiche Behandlung.',
      honors_chapter: 'Auszeichnungen', honors_title: 'Zwei Wettbewerbe. Eine starke Saison.', honors_lede: 'Silber in der Sportkategorie in Laval und der Gesamttitel der internationalen Division in Paris, beide im Jahr 2026.',
      honors_scene_caption: 'Paris, 2026', honors_scene_note: 'Das Ergebnis, gemeinsam mit Team Kanada.', laval_medal: 'Silbermedaille',
      laval_rank: 'Zweiter Platz', laval_name: 'Sportkategorie', laval_note: 'Hubert gewann Silber in der Sportkategorie beim Massage Therapy Summit in Laval.',
      paris_rank: 'Gesamtsieger', paris_name: 'Internationale Division', paris_note: 'Als bester Therapeut der internationalen Division ausgezeichnet.',
      empathy_rank: 'Empathiepreis', empathy_name: 'Sportmassage', empathy_note: 'Ausgezeichnet für Sorgfalt, Aufmerksamkeit und Kommunikation während der Behandlung.',
      photo_rank: 'Zweiter Platz', photo_name: 'Bestes Massagefoto', photo_note: 'Zweiter Platz für ein Bild, das die Qualität der Arbeit zeigt.',
      multi_rank: 'Mehrere Spitzenplatzierungen', multi_name: 'Sportmassage und westliche Traditionen', multi_note: 'Starke Ergebnisse in Sportmassage und westlich geprägten Kategorien.',
      gallery_chapter: 'In der Praxis', gallery_1: 'Fokus an der Behandlungsliege.', gallery_2: 'Thai-Technik im Wettbewerb.', gallery_3: 'Kontrollierte Kraft und Beweglichkeit.', gallery_4: 'Stütze für Nacken und Schultern.', gallery_5: 'Sorgfältige Schulterarbeit.', gallery_6: 'Schröpfen mit unterstützter Dehnung.', gallery_7: 'Balance und Körpergewicht nutzen.', gallery_8: 'Beweglichkeit durch Bewegung zurückgewinnen.', gallery_9: 'Volle Aufmerksamkeit an der Liege.', gallery_10: 'Auf der Höhe des Klienten arbeiten.', gallery_hint: 'Wischen oder ziehen',
      creed_aria: 'Philosophie', creed_quote: 'Technik zählt. Verbindung macht sie wirksam.',
      contact_chapter: 'Kontakt', contact_title: 'Sprechen wir', contact_lede: 'Für Termine, Seminare, Medien oder Fragen zu Huberts Arbeit.', contact_email_label: 'Direkte E-Mail', contact_phone_label: 'Telefon',
      form_name: 'Name', form_email: 'E-Mail', form_message: 'Nachricht', form_send: 'Senden', form_validation: 'Bitte Namen, gültige E-Mail-Adresse und eine Nachricht eingeben.', form_opening: 'E-Mail-App wird geöffnet.',
      footer_place: 'Markham, Ontario, Kanada', lightbox_aria: 'Bildansicht', lightbox_close: 'Schließen', lightbox_prev: 'Vorheriges Bild', lightbox_next: 'Nächstes Bild',
      alt_medal: 'Hubert Mak erhält in Paris seine Goldmedaille', alt_craft: 'Hubert Mak führt im Wettbewerb eine Thai-Dehnung aus', alt_connection: 'Hubert Mak stützt während einer Behandlung den Kopf eines Klienten', alt_celebration: 'Hubert Mak feiert in Paris mit Team Kanada', alt_treatment: 'Hubert Mak bei einer Massagebehandlung'
    },

    es: {
      meta_title: 'Hubert Mak | Campeón de masaje y osteópata manual',
      meta_description: 'Hubert Mak es terapeuta de masaje registrado y osteópata manual en Markham, Ontario, y ganador absoluto de la división internacional 2026 en París.',
      skip: 'Ir al contenido', nav_approach: 'Enfoque', nav_awards: 'Premios', nav_gallery: 'Galería', nav_contact: 'Contacto', nav_language: 'Cambiar idioma',
      rail_film: 'Película', rail_approach: 'Enfoque', rail_awards: 'Premios', rail_moments: 'Momentos', rail_contact: 'Contacto',
      hero_eyebrow: 'Atención profesional · Resultados internacionales', hero_statement: 'Cuidado, fuerza y precisión en cada tratamiento.',
      hero_role_one: 'Terapeuta de masaje registrado', hero_role_two: 'Osteópata manual', hero_role_three: 'Fundador de MakCare',
      hero_award_label: 'Ganador absoluto 2026', hero_award_title: 'División internacional', hero_award_place: 'Euro Massage Championship · París', hero_scroll: 'Desplazar',
      proof_one: 'París · Ganador absoluto de la división internacional', proof_two: 'Laval · Plata en categoría deportiva', proof_three: 'Markham · MakCare Salud y Bienestar',
      book_eyebrow: 'Tratamiento en Markham', book_title: '¿Listo para moverte y sentirte mejor?', book_button: 'Reservar un masaje',
      film_aria: 'Película', film_chapter: 'En movimiento', film_video_alt: 'Hubert Mak en el Euro Massage Championship 2026', sound_on: 'Activar sonido', sound_off: 'Silenciar', film_caption: 'Un minuto dentro de su trabajo.',
      craft_chapter: 'Enfoque', craft_title: 'El trabajo detrás de los resultados', craft_stage_note: 'Formación clínica · Masaje tailandés · Terapia de estiramiento · Acupuntura',
      craft_p1: 'Hubert Mak es terapeuta de masaje registrado y osteópata manual en Markham. Su trabajo une formación clínica, masaje tailandés, terapia de estiramiento, acupuntura y años de experiencia práctica.',
      craft_p2: 'Fundó MakCare Health and Wellness Centre para reunir estos métodos en un enfoque práctico. Cada tratamiento empieza con la persona que tiene delante: entender lo que necesita el cuerpo, elegir el método adecuado y ayudar al cliente a moverse y sentirse mejor.',
      craft_inset_caption: 'El cuidado empieza con atención.',
      craft_p3: 'La misma concentración guía su trabajo en competición. En 2026, Hubert obtuvo la plata en la categoría deportiva en Laval y después el título absoluto de la división internacional en París. Los resultados reflejan años de práctica, preparación y decisiones claras bajo presión.',
      craft_p4: 'Sigue tratando, estudiando y perfeccionando su técnica. El objetivo se mantiene sencillo: ofrecer una atención experta, cuidadosa y útil.',
      honors_chapter: 'Premios', honors_title: 'Dos eventos. Una temporada excepcional.', honors_lede: 'Plata en la categoría deportiva en Laval y el título absoluto de la división internacional en París, ambos en 2026.',
      honors_scene_caption: 'París, 2026', honors_scene_note: 'El resultado, compartido con el equipo de Canadá.', laval_medal: 'Medalla de plata',
      laval_rank: 'Segundo puesto', laval_name: 'Categoría deportiva', laval_note: 'Hubert obtuvo la plata en la categoría deportiva en el Massage Therapy Summit de Laval.',
      paris_rank: 'Ganador absoluto', paris_name: 'División internacional', paris_note: 'Nombrado mejor terapeuta de la división internacional.',
      empathy_rank: 'Premio a la empatía', empathy_name: 'Masaje deportivo', empathy_note: 'Reconocido por el cuidado, la atención y la comunicación durante el tratamiento.',
      photo_rank: 'Segundo puesto', photo_name: 'Mejor foto de masaje', photo_note: 'Segundo puesto por una imagen que muestra la calidad del trabajo.',
      multi_rank: 'Varios puestos destacados', multi_name: 'Masaje deportivo y tradiciones occidentales', multi_note: 'Resultados sólidos en masaje deportivo y categorías de inspiración occidental.',
      gallery_chapter: 'En la práctica', gallery_1: 'Concentración en la camilla.', gallery_2: 'Técnica tailandesa en competición.', gallery_3: 'Fuerza y rango controlados.', gallery_4: 'Apoyo para cuello y hombros.', gallery_5: 'Trabajo cuidadoso de hombros.', gallery_6: 'Ventosas con estiramiento asistido.', gallery_7: 'Uso del equilibrio y el peso corporal.', gallery_8: 'Recuperar el rango con movimiento.', gallery_9: 'Atención completa en la camilla.', gallery_10: 'Trabajar a la altura del cliente.', gallery_hint: 'Desliza o arrastra',
      creed_aria: 'Filosofía', creed_quote: 'La técnica importa. La conexión hace que funcione.',
      contact_chapter: 'Contacto', contact_title: 'Hablemos', contact_lede: 'Para citas, seminarios, medios o preguntas sobre el trabajo de Hubert.', contact_email_label: 'Correo directo', contact_phone_label: 'Teléfono',
      form_name: 'Nombre', form_email: 'Correo electrónico', form_message: 'Mensaje', form_send: 'Enviar', form_validation: 'Añade tu nombre, un correo válido y un mensaje.', form_opening: 'Abriendo tu aplicación de correo.',
      footer_place: 'Markham, Ontario, Canadá', lightbox_aria: 'Visor de imágenes', lightbox_close: 'Cerrar', lightbox_prev: 'Imagen anterior', lightbox_next: 'Imagen siguiente',
      alt_medal: 'Hubert Mak recibe su medalla de oro en París', alt_craft: 'Hubert Mak realiza un estiramiento tailandés en competición', alt_connection: 'Hubert Mak sostiene la cabeza de un cliente durante el tratamiento', alt_celebration: 'Hubert Mak celebra con el equipo de Canadá en París', alt_treatment: 'Hubert Mak realiza un tratamiento de masaje'
    },

    pt: {
      meta_title: 'Hubert Mak | Campeão de massagem e osteopata manual',
      meta_description: 'Hubert Mak é terapeuta de massagem registado e osteopata manual em Markham, Ontário, e vencedor geral da divisão internacional de 2026 em Paris.',
      skip: 'Ir para o conteúdo', nav_approach: 'Abordagem', nav_awards: 'Prémios', nav_gallery: 'Galeria', nav_contact: 'Contacto', nav_language: 'Mudar idioma',
      rail_film: 'Filme', rail_approach: 'Abordagem', rail_awards: 'Prémios', rail_moments: 'Momentos', rail_contact: 'Contacto',
      hero_eyebrow: 'Cuidados registados · Resultados internacionais', hero_statement: 'Cuidado, força e precisão em cada tratamento.',
      hero_role_one: 'Terapeuta de massagem registado', hero_role_two: 'Osteopata manual', hero_role_three: 'Fundador da MakCare',
      hero_award_label: 'Vencedor geral 2026', hero_award_title: 'Divisão internacional', hero_award_place: 'Euro Massage Championship · Paris', hero_scroll: 'Deslizar',
      proof_one: 'Paris · Vencedor geral da divisão internacional', proof_two: 'Laval · Prata na categoria desportiva', proof_three: 'Markham · MakCare Saúde e Bem-estar',
      book_eyebrow: 'Tratamento em Markham', book_title: 'Pronto para se mover e sentir melhor?', book_button: 'Marcar uma massagem',
      film_aria: 'Filme', film_chapter: 'Em movimento', film_video_alt: 'Hubert Mak no Euro Massage Championship 2026', sound_on: 'Ligar som', sound_off: 'Desligar som', film_caption: 'Um minuto dentro do trabalho.',
      craft_chapter: 'Abordagem', craft_title: 'O trabalho por trás dos resultados', craft_stage_note: 'Formação clínica · Massagem tailandesa · Terapia de alongamento · Acupuntura',
      craft_p1: 'Hubert Mak é terapeuta de massagem registado e osteopata manual em Markham. O seu trabalho junta formação clínica, massagem tailandesa, terapia de alongamento, acupuntura e anos de experiência prática.',
      craft_p2: 'Fundou o MakCare Health and Wellness Centre para reunir estes métodos numa abordagem prática. Cada tratamento começa com a pessoa à sua frente: compreender o que o corpo precisa, escolher o método certo e ajudar o cliente a mover-se e a sentir-se melhor.',
      craft_inset_caption: 'O cuidado começa com atenção.',
      craft_p3: 'A mesma concentração orienta o seu trabalho em competição. Em 2026, Hubert conquistou a prata na categoria desportiva em Laval e depois o título geral da divisão internacional em Paris. Os resultados refletem anos de prática, preparação e decisões claras sob pressão.',
      craft_p4: 'Continua a tratar, estudar e aperfeiçoar a técnica. O objetivo mantém-se simples: prestar cuidados competentes, atentos e úteis.',
      honors_chapter: 'Prémios', honors_title: 'Dois eventos. Uma época marcante.', honors_lede: 'Prata na categoria desportiva em Laval e o título geral da divisão internacional em Paris, ambos em 2026.',
      honors_scene_caption: 'Paris, 2026', honors_scene_note: 'O resultado, partilhado com a equipa do Canadá.', laval_medal: 'Medalha de prata',
      laval_rank: 'Segundo lugar', laval_name: 'Categoria desportiva', laval_note: 'Hubert conquistou a prata na categoria desportiva no Massage Therapy Summit em Laval.',
      paris_rank: 'Vencedor geral', paris_name: 'Divisão internacional', paris_note: 'Nomeado o melhor terapeuta da divisão internacional.',
      empathy_rank: 'Prémio de empatia', empathy_name: 'Massagem desportiva', empathy_note: 'Reconhecido pelo cuidado, atenção e comunicação demonstrados durante o tratamento.',
      photo_rank: 'Segundo lugar', photo_name: 'Melhor fotografia de massagem', photo_note: 'Segundo lugar por uma imagem que mostrou a qualidade do trabalho.',
      multi_rank: 'Várias classificações de topo', multi_name: 'Massagem desportiva e tradições ocidentais', multi_note: 'Resultados fortes em massagem desportiva e categorias de inspiração ocidental.',
      gallery_chapter: 'Na prática', gallery_1: 'Foco na marquesa.', gallery_2: 'Técnica tailandesa em competição.', gallery_3: 'Força e amplitude controladas.', gallery_4: 'Apoio no pescoço e ombros.', gallery_5: 'Trabalho cuidadoso dos ombros.', gallery_6: 'Ventosas com alongamento assistido.', gallery_7: 'Uso do equilíbrio e do peso corporal.', gallery_8: 'Recuperar amplitude através do movimento.', gallery_9: 'Atenção total na marquesa.', gallery_10: 'Trabalhar ao nível do cliente.', gallery_hint: 'Deslize ou arraste',
      creed_aria: 'Filosofia', creed_quote: 'A técnica importa. A ligação faz com que funcione.',
      contact_chapter: 'Contacto', contact_title: 'Vamos conversar', contact_lede: 'Para marcações, seminários, imprensa ou questões sobre o trabalho de Hubert.', contact_email_label: 'E-mail direto', contact_phone_label: 'Telefone',
      form_name: 'Nome', form_email: 'E-mail', form_message: 'Mensagem', form_send: 'Enviar', form_validation: 'Adicione o seu nome, um e-mail válido e uma mensagem.', form_opening: 'A abrir a sua aplicação de e-mail.',
      footer_place: 'Markham, Ontário, Canadá', lightbox_aria: 'Visualizador de imagens', lightbox_close: 'Fechar', lightbox_prev: 'Imagem anterior', lightbox_next: 'Imagem seguinte',
      alt_medal: 'Hubert Mak recebe a medalha de ouro em Paris', alt_craft: 'Hubert Mak realiza um alongamento tailandês em competição', alt_connection: 'Hubert Mak apoia a cabeça de um cliente durante o tratamento', alt_celebration: 'Hubert Mak celebra com a equipa do Canadá em Paris', alt_treatment: 'Hubert Mak realiza um tratamento de massagem'
    },

    ru: {
      meta_title: 'Хьюберт Мак | Чемпион по массажу и мануальный остеопат',
      meta_description: 'Хьюберт Мак работает зарегистрированным массажистом и мануальным остеопатом в Маркеме, Онтарио, и стал абсолютным победителем международного дивизиона 2026 года в Париже.',
      skip: 'Перейти к содержанию', nav_approach: 'Подход', nav_awards: 'Награды', nav_gallery: 'Галерея', nav_contact: 'Контакты', nav_language: 'Изменить язык',
      rail_film: 'Фильм', rail_approach: 'Подход', rail_awards: 'Награды', rail_moments: 'Моменты', rail_contact: 'Контакты',
      hero_eyebrow: 'Профессиональная помощь · Международные результаты', hero_statement: 'Забота, сила и точность в каждом сеансе.',
      hero_role_one: 'Зарегистрированный массажист', hero_role_two: 'Мануальный остеопат', hero_role_three: 'Основатель MakCare',
      hero_award_label: 'Абсолютный победитель 2026', hero_award_title: 'Международный дивизион', hero_award_place: 'Euro Massage Championship · Париж', hero_scroll: 'Листать',
      proof_one: 'Париж · Абсолютный победитель международного дивизиона', proof_two: 'Лаваль · Серебро в спортивной категории', proof_three: 'Маркем · Центр MakCare',
      book_eyebrow: 'Лечение в Маркеме', book_title: 'Готовы двигаться и чувствовать себя лучше?', book_button: 'Записаться на массаж',
      film_aria: 'Фильм', film_chapter: 'В движении', film_video_alt: 'Хьюберт Мак на Euro Massage Championship 2026', sound_on: 'Включить звук', sound_off: 'Выключить звук', film_caption: 'Одна минута внутри работы.',
      craft_chapter: 'Подход', craft_title: 'Работа, которая дает результат', craft_stage_note: 'Клиническая подготовка · Тайский массаж · Стретч-терапия · Акупунктура',
      craft_p1: 'Хьюберт Мак работает зарегистрированным массажистом и мануальным остеопатом в Маркеме. В своей практике он сочетает клиническую подготовку, тайский массаж, стретч-терапию, акупунктуру и многолетний практический опыт.',
      craft_p2: 'Он основал центр MakCare Health and Wellness, чтобы объединить эти методы в одном практичном подходе. Каждый сеанс начинается с человека перед ним: понять потребности тела, выбрать подходящий метод и помочь клиенту лучше двигаться и чувствовать себя.',
      craft_inset_caption: 'Забота начинается с внимания.',
      craft_p3: 'Та же сосредоточенность определяет его работу на соревнованиях. В 2026 году Хьюберт завоевал серебро в спортивной категории в Лавале, а затем стал абсолютным победителем международного дивизиона в Париже. Эти результаты отражают годы практики, подготовку и ясные решения под давлением.',
      craft_p4: 'Он продолжает работать с клиентами, учиться и совершенствовать технику. Цель остается простой: оказывать квалифицированную, внимательную и полезную помощь.',
      honors_chapter: 'Награды', honors_title: 'Два турнира. Выдающийся сезон.', honors_lede: 'Серебро в спортивной категории в Лавале и абсолютный титул международного дивизиона в Париже, оба в 2026 году.',
      honors_scene_caption: 'Париж, 2026', honors_scene_note: 'Результат, разделенный с командой Канады.', laval_medal: 'Серебряная медаль',
      laval_rank: 'Второе место', laval_name: 'Спортивная категория', laval_note: 'Хьюберт завоевал серебро в спортивной категории на Massage Therapy Summit в Лавале.',
      paris_rank: 'Абсолютный победитель', paris_name: 'Международный дивизион', paris_note: 'Признан лучшим терапевтом международного дивизиона.',
      empathy_rank: 'Награда за эмпатию', empathy_name: 'Спортивный массаж', empathy_note: 'Отмечен за заботу, внимание и общение во время сеанса.',
      photo_rank: 'Второе место', photo_name: 'Лучшая фотография массажа', photo_note: 'Второе место за снимок, передающий качество работы.',
      multi_rank: 'Несколько высоких мест', multi_name: 'Спортивный массаж и западные традиции', multi_note: 'Сильные результаты в спортивном массаже и категориях западного направления.',
      gallery_chapter: 'В практике', gallery_1: 'Полная концентрация у стола.', gallery_2: 'Тайская техника на соревновании.', gallery_3: 'Контролируемая сила и амплитуда.', gallery_4: 'Поддержка шеи и плеч.', gallery_5: 'Точная работа с плечами.', gallery_6: 'Банки и пассивная растяжка.', gallery_7: 'Баланс и вес тела в работе.', gallery_8: 'Возвращение амплитуды через движение.', gallery_9: 'Все внимание на работе.', gallery_10: 'Работа на уровне клиента.', gallery_hint: 'Проведите или перетащите',
      creed_aria: 'Философия', creed_quote: 'Техника важна. Контакт делает ее эффективной.',
      contact_chapter: 'Контакты', contact_title: 'Давайте поговорим', contact_lede: 'По вопросам записи, семинаров, прессы или работы Хьюберта.', contact_email_label: 'Прямая почта', contact_phone_label: 'Телефон',
      form_name: 'Имя', form_email: 'Электронная почта', form_message: 'Сообщение', form_send: 'Отправить', form_validation: 'Укажите имя, действующий адрес электронной почты и сообщение.', form_opening: 'Открываем почтовое приложение.',
      footer_place: 'Маркем, Онтарио, Канада', lightbox_aria: 'Просмотр изображений', lightbox_close: 'Закрыть', lightbox_prev: 'Предыдущее изображение', lightbox_next: 'Следующее изображение',
      alt_medal: 'Хьюберт Мак получает золотую медаль в Париже', alt_craft: 'Хьюберт Мак выполняет тайскую растяжку на соревновании', alt_connection: 'Хьюберт Мак поддерживает голову клиента во время сеанса', alt_celebration: 'Хьюберт Мак празднует с командой Канады в Париже', alt_treatment: 'Хьюберт Мак проводит сеанс массажа'
    }
  };

  var code = window.HM_LANGUAGE && copy[window.HM_LANGUAGE] ? window.HM_LANGUAGE : 'en';
  var active = copy[code];
  var fallback = copy.en;

  function translate(key) { return active[key] || fallback[key] || key; }
  window.HM_TRANSLATE = translate;

  document.querySelectorAll('[data-i18n]').forEach(function (element) {
    element.textContent = translate(element.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(function (element) {
    element.setAttribute('aria-label', translate(element.getAttribute('data-i18n-aria')));
  });
  document.querySelectorAll('[data-i18n-alt]').forEach(function (element) {
    element.setAttribute('alt', translate(element.getAttribute('data-i18n-alt')));
  });
  document.querySelectorAll('[data-i18n-caption]').forEach(function (element) {
    element.setAttribute('data-caption', translate(element.getAttribute('data-i18n-caption')));
  });

  document.title = translate('meta_title');
  var description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute('content', translate('meta_description'));
  var canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = 'https://hubertmak.com/site.html?lang=' + code;
  var ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', 'https://hubertmak.com/site.html?lang=' + code);
  var ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute('content', translate('meta_title'));
  var ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute('content', translate('hero_statement'));

  var flag = document.getElementById('current-flag');
  var currentLanguage = document.getElementById('current-language');
  var shortLabels = { en:'EN', fr:'FR', yue:'粵', zh:'中', ja:'日', de:'DE', es:'ES', pt:'PT', ru:'RU' };
  if (flag) flag.setAttribute('href', 'assets/flags.svg#flag-' + code);
  if (currentLanguage) currentLanguage.textContent = shortLabels[code] || 'EN';

  document.body.classList.remove('is-i18n-loading');
})();
