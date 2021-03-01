export interface RankNode {
    acct_id: string
    desc: string
    iRank: string
    league_points: string
    name: string
    profile_icon_id: string
    rank: string
    tier: string
    total_leaves: string
    total_losses: string
    total_wins: string
    qquin: string
    likes: number
    follow: FollowNode
    rankReview: reviewInfo
}

export interface reviewInfo {
    wxId?: string
    name: string
    clan: string
    pltf: string
    desc: string
}

export interface FollowNode {
    rankId: string
    wxId: string
    name: string
    createAt: string
    index?: number
}
