import React, { useEffect, useState } from "react";
import { List } from "../components/List/List";
import { GithubProfile } from "../types";
import styled from "styled-components";

const AvatarWrapper = styled.img`
  width: 250px;
  height: 250px;
`;

const ProfileWrapper = styled.div`
  width: 50%;
  margin: 10px auto;
`;

export const Profile = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubProfile[] | null>(null);
  useEffect(() => {
    async function getProfile() {
      const data = await fetch("https://api.github.com/users/thangpham7793");
      const profileJSON = await data.json();
      if (profileJSON) {
        // essentially a DTO mapper
        setProfile({
          avatarUrl: profileJSON.avatar_url,
          githubUrl: profileJSON.html_url,
          linkedInUrl: profileJSON.blog,
          bio: profileJSON.bio,
          name: profileJSON.name,
          company: profileJSON.company,
          publicRepos: profileJSON.public_repos,
          hireable: profileJSON.hireable,
        });

        const reposData = await fetch(profileJSON.repos_url);
        const reposJSON = (await reposData.json()) as GithubProfile[];
        if (reposJSON) {
          setRepos(
            reposJSON.map((repo: GithubProfile) => {
              return { repoNameAndUrl: `${repo.name}|${repo.html_url}` };
            })
          );
        }
      }
    }
    getProfile();
  }, []);

  return !profile ? (
    <ProfileWrapper>Loading</ProfileWrapper>
  ) : (
    <ProfileWrapper>
      <AvatarWrapper
        src={profile ? (profile.avatarUrl as string) : ""}
        alt="avatar"
      />
      <List items={Object.entries(profile)} />
      {/* fulfilling the API contract of Array<[string, string | number]> */}
      {repos ? <List items={repos.map((r) => Object.entries(r)[0])} /> : null}
    </ProfileWrapper>
  );
};
