-- Seed data for The Identity

-- Members
INSERT INTO members (name, role, bio, image_url, social_links)
VALUES
('Victor Osondu', 'Creative Director', 'Visionary creative director shaping the sound, style, and identity of The Identity. With a deep passion for gospel music and artistic excellence, Victor leads the creative direction of the group.', '', '{"instagram": "https://instagram.com/", "twitter": "https://twitter.com/"}'),
('Sarah Johnson', 'Lead Vocalist', 'Powerful vocalist with a heart for worship. Sarah brings soul-stirring energy to every performance.', '', '{"instagram": "https://instagram.com/"}'),
('Michael Kofi', 'Producer & Keyboardist', 'Award-winning producer behind the signature sound of The Identity. Michael blends contemporary gospel with modern afro-beats.', '', '{"instagram": "https://instagram.com/"}'),
('Grace Amara', 'Backup Vocalist', 'Grace adds harmony and depth to every track. Her background in classical training brings a unique flavor to the group.', '', '{}'),
('David Osei', 'Drummer & Percussionist', 'The rhythmic backbone of The Identity. Davids powerful drumming brings energy to every live performance.', '', '{}');

-- Music Releases
INSERT INTO music_releases (title, artist, description, cover_image_url, release_date, featured)
VALUES
('Great Is Thy Faithfulness', 'The Identity', 'A powerful gospel anthem celebrating Gods unwavering faithfulness. This track blends contemporary worship with traditional gospel roots.', '', '2026-06-15', true),
('Awesome God', 'The Identity', 'An energetic praise song declaring the greatness of our God. Featuring uplifting harmonies and a dynamic choir arrangement.', '', '2026-04-01', false),
('Way Maker', 'The Identity', 'A soul-stirring rendition of the classic worship song. The Identity brings a fresh African gospel flavor to this beloved track.', '', '2026-01-20', false),
('Nobody Like You', 'The Identity', 'An original gospel single celebrating the uniqueness of God. Catchy melody with a powerful message.', '', '2025-11-10', false),
('Yahweh', 'The Identity', 'A worship experience that draws listeners into the presence of God. Featuring Victor Osondu on creative direction.', '', '2025-08-05', false);

-- Events
INSERT INTO events (title, description, event_date, event_time, venue, location, ticket_url)
VALUES
('The Identity Worship Night 2026', 'A night of powerful worship, prayer, and fellowship. Join The Identity for an unforgettable evening of gospel music.', '2026-12-15', '18:00', 'Accra International Conference Centre', 'Accra, Ghana', ''),
('Gospel Music Festival', 'The Identity headlines this years Gospel Music Festival alongside top gospel artists from across Africa.', '2026-09-20', '16:00', 'National Stadium', 'Lagos, Nigeria', ''),
('Youth Revival Concert', 'A special concert aimed at inspiring the next generation through music and the word.', '2026-08-10', '17:00', 'Victory Centre', 'Nairobi, Kenya', ''),
('The Identity Album Launch', 'Official launch event for the debut album. Live performances, meet and greet, and special guests.', '2026-03-05', '19:00', 'The Grand Arena', 'Accra, Ghana', ''),
('Community Outreach Concert', 'A free community concert giving back to the local community. Food, music, and fellowship for all.', '2025-12-20', '15:00', 'Community Park', 'Kumasi, Ghana', '');

-- Gallery (using placeholder images)
INSERT INTO gallery (image_url, title, caption, category)
VALUES
('', 'Worship Night 2025', 'The Identity leading worship at the 2025 Worship Night', 'Performance'),
('', 'Studio Session', 'Behind the scenes during the recording of Great Is Thy Faithfulness', 'Behind the Scenes'),
('', 'Team Photo', 'The full Identity team after a rehearsal', 'Group'),
('', 'Concert Moment', 'An energetic moment during the Gospel Music Festival', 'Performance'),
('', 'Community Outreach', 'The Identity team serving at the community outreach event', 'Event'),
('', 'Album Cover Shoot', 'Behind the scenes of the debut album photoshoot', 'Behind the Scenes');

-- Social Links
INSERT INTO social_links (platform, url, display_order, active)
VALUES
('Spotify', 'https://open.spotify.com/', 1, true),
('Apple Music', 'https://music.apple.com/', 2, true),
('YouTube', 'https://youtube.com/', 3, true),
('Instagram', 'https://instagram.com/', 4, true),
('Facebook', 'https://facebook.com/', 5, true),
('TikTok', 'https://tiktok.com/', 6, true),
('Twitter', 'https://twitter.com/', 7, true),
('Audiomack', 'https://audiomack.com/', 8, true),
('Boomplay', 'https://boomplay.com/', 9, true);

-- News
INSERT INTO news (title, slug, content, status, published_at)
VALUES
('The Identity Announces Debut Album', 'the-identity-announces-debut-album', '<p>We are thrilled to announce that The Identity will be releasing our debut album in 2026! The album, titled "Great Is Thy Faithfulness," features 12 tracks of powerful gospel music.</p><p>Stay tuned for more details on the release date and pre-order information.</p>', 'published', '2026-06-01'),
('Worship Night 2026 Dates Announced', 'worship-night-2026-dates-announced', '<p>The Identity Worship Night returns in 2026 bigger and better. Join us for nights of powerful worship across multiple cities in Africa.</p><p>Dates and venues will be announced soon. Follow us on social media for updates.</p>', 'published', '2026-05-15'),
('New Single "Great Is Thy Faithfulness" Out Now', 'new-single-great-is-thy-faithfulness-out-now', '<p>Our latest single "Great Is Thy Faithfulness" is now available on all streaming platforms. This powerful gospel anthem is already touching lives across the globe.</p><p>Listen now on Spotify, Apple Music, Audiomack, and Boomplay.</p>', 'published', '2026-06-15');
