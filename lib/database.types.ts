export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          id: string
          registration_id: string
          certificate_url: string | null
          created_at: string
        }
        Insert: {
          id?: string
          registration_id: string
          certificate_url?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          registration_id?: string
          certificate_url?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_registration_id_fkey"
            columns: ["registration_id"]
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          start_date: string
          end_date: string
          image_url: string | null
          capacity: number
          category_id: number | null
          organizer_id: string
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          start_date: string
          end_date: string
          image_url?: string | null
          capacity: number
          category_id?: number | null
          organizer_id: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          start_date?: string
          end_date?: string
          image_url?: string | null
          capacity?: number
          category_id?: number | null
          organizer_id?: string
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_category_id_fkey"
            columns: ["category_id"]
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          id: string
          registration_id: string
          rating: number | null
          comments: string | null
          created_at: string
        }
        Insert: {
          id?: string
          registration_id: string
          rating?: number | null
          comments?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          registration_id?: string
          rating?: number | null
          comments?: string | null
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_registration_id_fkey"
            columns: ["registration_id"]
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          id: string
          full_name: string | null
          avatar_url: string | null
          is_admin: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          is_admin?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      registrations: {
        Row: {
          id: string
          event_id: string
          user_id: string
          ticket_id: string
          qr_code: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          user_id: string
          ticket_id: string
          qr_code?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          user_id?: string
          ticket_id?: string
          qr_code?: string | null
          status?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
