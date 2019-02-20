define({
  api: [
    {
      type: 'GET',
      url: '/logout',
      title: '',
      group: 'AuthGroup',
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'AuthGroup',
      name: 'GetLogout'
    },
    {
      type: 'POST',
      url: '/login',
      title: 'Sign in user',
      group: 'AuthGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>Email</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'Password',
              description: '<p>Password</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'AuthGroup',
      name: 'PostLogin'
    },
    {
      type: 'DELETE',
      url: '/post/:id',
      title: 'Remove',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Id of the post to be removed</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'DeletePostId'
    },
    {
      type: 'GET',
      url: '/post/:id',
      title: 'Get Single',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Id of the post to be found</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'GetPostId'
    },
    {
      type: 'GET',
      url: '/post/:offset/:limit',
      title: 'Get All',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'Number',
              optional: false,
              field: 'offset',
              description: '<p>Specify where the list start</p>'
            },
            {
              group: 'Parameter',
              type: 'Number',
              optional: false,
              field: 'limit',
              description: '<p>Specify where the list ends</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'GetPostOffsetLimit'
    },
    {
      type: 'GET',
      url: '/post/search',
      title: 'Search for Posts',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'Number',
              optional: false,
              field: 'offset',
              description: '<p>Specify where the list start</p>'
            },
            {
              group: 'Parameter',
              type: 'Number',
              optional: false,
              field: 'limit',
              description: '<p>Specify where the list ends</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'GetPostSearch'
    },
    {
      type: 'PATCH',
      url: '/post/:id',
      title: 'Reply',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Id of the post to be replied</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'content',
              description: '<p>Content of the post</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'PatchPostId'
    },
    {
      type: 'POST',
      url: '/post',
      title: 'Create',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'title',
              description: '<p>Title of the post</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'content',
              description: '<p>Content of the post</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'author',
              description: '<p>Id of the post author</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'PostPost'
    },
    {
      type: 'PUT',
      url: '/post/:id',
      title: 'Update',
      group: 'PostGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'author',
              description: '<p>Id of the post author</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'title',
              description: '<p>Title of the post</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'content',
              description: '<p>Content of the post</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/post-api.ts',
      groupTitle: 'Post endpoints',
      groupDescription:
        '<p>Post are tree structured. A root Post has a title and does not have a <code>parent</code> attribute. Replies are Post as well and are the chidlren of a root Post. Replies have a <code>parent</code> attribute.</p>',
      name: 'PutPostId'
    },
    {
      type: 'DELETE',
      url: '/user',
      title: 'Remove',
      group: 'UserGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Id of the User to remove</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'User enpoints',
      name: 'DeleteUser'
    },
    {
      type: 'GET',
      url: '/user/',
      title: 'Get Users',
      group: 'UserGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'query',
              description: '<p>Query to find the users</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'User enpoints',
      name: 'GetUser'
    },
    {
      type: 'GET',
      url: '/user/:id',
      title: 'Get Single',
      group: 'UserGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'id',
              description: '<p>Id of the post to be found</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'User enpoints',
      name: 'GetUserId'
    },
    {
      type: 'POST',
      url: '/user',
      title: 'Create',
      group: 'UserGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'nome',
              description: '<p>First Name</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: false,
              field: 'email',
              description: '<p>Email</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'avatar',
              description: '<p>Image Base64 or URL</p>'
            },
            {
              group: 'Parameter',
              type: 'Number',
              optional: true,
              field: 'points',
              description: '<p>Points</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'User enpoints',
      name: 'PostUser'
    },
    {
      type: 'PUT',
      url: '/user',
      title: 'Update',
      group: 'UserGroup',
      parameter: {
        fields: {
          Parameter: [
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'name',
              description: '<p>First Name</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'email',
              description: '<p>Email</p>'
            },
            {
              group: 'Parameter',
              type: 'String',
              optional: true,
              field: 'avatar',
              description: '<p>Image Base64 or URL</p>'
            }
          ]
        }
      },
      version: '0.0.0',
      filename: 'src/routes/user-api.ts',
      groupTitle: 'User enpoints',
      name: 'PutUser'
    }
  ]
});
