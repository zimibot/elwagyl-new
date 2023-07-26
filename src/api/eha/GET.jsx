import { useInfiniteQuery, useQuery } from "react-query";
import { GetAndUpdateContext } from "../../model/context.function";
import { useLocation } from "react-router-dom";

export const path = import.meta.env.VITE_PATH_API_EHA;

export function checkStatement(statement) {
  for (var i = 0; i < statement.length; i++) {
    if (statement[i] === true) {
      return true;
    }
  }
  return false
}

export const GET_API_EHA = {
  data: {
    scanTools: (status) => {
      if (status) {
        const { isLoading, data, error } = useQuery(
          ["listScanning", status.UpdateStatus, status.scanning_tools],
          () =>
            fetch(
              `${path}/api/tool-scanners?${status.scanning_tools
                ? `scanning_tools=${status.scanning_tools}`
                : ""
              }`,
              { method: "GET" }
            ).then((res) => {
              return res.json();
            })
        );


        return {
          isLoading,
          data,
          error,
        };
      }
    },
    toolsScanner: (status) => {
      if (status) {
        const { isLoading, data, error } = useQuery(
          ["toolsScanner", status.UpdateStatus],
          () =>
            fetch(`${path}/api/general/tool-scanner-list`, {
              method: "GET",
            }).then((res) => {
              return res.json();
            })
        );
        return {
          isLoading,
          data,
          error,
        };
      }
    },
    emailSettings: (status) => {
      if (status) {
        const { isLoading, data, error, refetch, isFetching } = useQuery(
          ["emailSettings", status.UpdateStatus],
          () =>
            fetch(`${path}/api/manage-email-notification`, {
              method: "GET",
            }).then((res) => {
              return res.json();
            })
        );
        return {
          isLoading,
          data,
          error,
          refetch,
          isFetching,
        };
      }
    },
    vulnerability: (status, query, pages, name) => {
      if (status) {
        const stateLocation = useLocation();
        const { isLoading, data, error, refetch, isFetching } = useQuery(
          [
            name ? name : "vulnerability",
            status.UpdateStatus,
            pages,
            stateLocation.state.id,
            query,
          ],
          () =>
            fetch(
              `${path}/api/vulnerabilities?page=${pages ? pages : 1}&limit=15&${stateLocation.state?.id
                ? `scan_id=${stateLocation.state?.id}&`
                : ""
              }${query ? query : ""}`,
              { method: "GET" }
            ).then((res) => {
              return res.json();
            })
        );
        return {
          isLoading,
          data,
          error,
          refetch,
          isFetching,
        };
      }
    },

    scanToolsDetail: async (propsItem) => {
      const { idScan } = propsItem || {};

      if (idScan) {
        let items = await fetch(`${path}/api/tool-scanners/${idScan}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });

        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    protectedSite: (status) => {
      if (status) {
        const { isLoading, data, error, refetch, isFetching } = useQuery(
          ["protectedSite", status.UpdateStatus],
          () =>
            fetch(`${path}/api/protected-sites`, { method: "GET" }).then(
              (res) => {
                return res.json();
              }
            )
        );
        return {
          isLoading,
          data,
          error,
          refetch,
          isFetching,
        };
      }
    },
    protectedSiteDetail: async (propsItem) => {
      const { idProtectedSite } = propsItem || {};

      if (idProtectedSite) {
        let items = await fetch(
          `${path}/api/protected-sites/${idProtectedSite}`,
          { method: "GET" }
        ).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    vulnerabilitiesDetail: async (propsItem) => {
      const { idvul } = propsItem || {};

      if (idvul) {
        let items = await fetch(`${path}/api/vulnerabilities/${idvul}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    scanDetails: async (propsItem) => {
      const { idscanDetail } = propsItem || {};

      if (idscanDetail) {
        let items = await fetch(`${path}/api/scans/${idscanDetail}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },

    assetsList: (status, query) => {
      if (status) {
        const { isLoading, data, error, refetch, isFetching } = useQuery(
          ["assetsList", status.UpdateStatus, query],
          () =>
            fetch(`${path}/api/assets?${query ? query : ""}`, { method: "GET" }).then((res) => {
              return res.json();
            })
        );
        return {
          isLoading,
          data,
          error,
          refetch, 
          isFetching
        };
      }
    },

    systemOwner: (status) => {
      if (status) {
        const { isLoading, data, error } = useQuery(
          ["systemOwner", status.UpdateStatus],
          () =>
            fetch(`${path}/api/system-owners`, { method: "GET" }).then(
              (res) => {
                return res.json();
              }
            )
        );
        return {
          isLoading,
          data,
          error,
        };
      }
    },
    systemOwnerDetail: async (propsItem) => {
      const { idOwner } = propsItem || {};

      if (idOwner) {
        let items = await fetch(`${path}/api/system-owners/${idOwner}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    platformDetail: async (propsItem) => {
      try {
        const { platform_id } = propsItem || {};

        if (platform_id) {
          let items = await fetch(`${path}/api/platforms/${platform_id}`, {
            method: "GET",
          }).then((res) => {
            return res.json();
          });
          return {
            items,
          };
        } else {
          return {
            error: true
          }
        }
      } catch (error) {
        return {
          error: true
        }
      }
    },
    getAssetsPlatformName: (propsItem) => {
      const { idPlatform, page, refresh } = propsItem || {};

      const { isLoading, data, error, refetch, isFetching } = useQuery(
        ["getAssetsPlatformName", idPlatform, page, refresh],
        () => {
          if (idPlatform && page) {
            return fetch(
              `${path}/api/platform-categories/?category=${idPlatform}&page=${page}`,
              { method: "GET" }
            ).then((res) => {
              return res.json();
            });
          } else {
            return {
              result: [],
            };
          }
        }
      );
      return {
        isLoading,
        data,
        error,
        refetch,
        isFetching,
      };
    },
    getAssetsDetail: async (propsItem) => {
      const { idAssets } = propsItem || {};

      if (idAssets) {
        let items = await fetch(`${path}/api/assets/${idAssets}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    getAssetsPDF: async (propsItem) => {
      const { idAssets } = propsItem || {};

      if (idAssets) {
        let items = await fetch(`${path}/api/assets/export/${idAssets}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        }
      }
    },
    getAssetsRiskGroupDetail: async (propsItem) => {
      const { idAssets } = propsItem || {};

      if (idAssets) {
        let items = await fetch(`${path}/api/asset-risk-groups/${idAssets}`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        });
        return {
          items,
        };
      } else {
        return {
          error: true
        };
      }
    },

    scan: (status, query) => {
      if (status) {
        const {
          isLoading,
          data,
          error,
          refetch,
          isFetching,
          status: statusData,
        } = useQuery(
          ["scan", status.UpdateStatus, query],
          () =>
            fetch(`${path}/api/scans?${query ? query : ""}`, { method: "GET" }).then((res) => {
              return res.json();
            }),
          {
            refetchInterval: (data) => {
              let items = [];

              if (data) {
                data = data.result || [];
                data.map((d) => {
                  items.push(d.status === "completed" ? false : true);

                  d.sub_scans.map((d) => {
                    items.push(d.status === "completed" ? false : true);
                  });
                });
              }

              return checkStatement(items) ? 10000 : false;
            },

            // data akan di-refetch setiap 60 detik
          }
        );
        return {
          isLoading,
          data,
          error,
          refetch,
          isFetching,
          statusData,
        };
      }
    },
    getCategoryPlatform: () => {
      const { isLoading, data, error } = useQuery(["scan"], () =>
        fetch(`${path}/api/general/platform-category-list`, {
          method: "GET",
        }).then((res) => {
          return res.json();
        })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    assetRiskGroup: () => {
      const { isLoading, data, error, refetch, isFetching } = useQuery(
        ["assetRiskGroup"],
        () =>
          fetch(`${path}/api/asset-risk-groups`, { method: "GET" }).then(
            (res) => {
              return res.json();
            }
          )
      );
      return {
        isLoading,
        data,
        error,
        refetch,
        isFetching,
      };
    },

    getLogsActivity: (status) => {
      if (status) {
        const { isLoading, data, error } = useQuery(
          ["logs", status.pages_logs],
          () =>
            fetch(
              `${path}/api/logs?page=${status.pages_logs ? status.pages_logs : 1
              }&limit=15`,
              { method: "GET" }
            ).then((res) => {
              return res.json();
            })
        );
        return {
          isLoading,
          data,
          error,
        };
      }
    },
    mainDeckStatisticSoverdueFinding: (status) => {
      if (status) {
        const { data, error, isLoading, ...props } = useInfiniteQuery(
          "overdue-finding",
          ({ pageParam = 1 }) =>
            fetch(
              `${path}/api/protected-sites/statistic/overdue-finding?page=${pageParam}`,
              { method: "GET" }
            ).then((res) => res.json()),
          {
            getNextPageParam: (lastPage) => {
              return lastPage &&
                lastPage.pagination &&
                lastPage.pagination.next_page
                ? lastPage.pagination.next_page.split("=")[1] + "=40"
                : undefined;
            },
          }
        );

        return {
          data,
          error,
          isLoading,
          props,
        };
      }
    },
    mainDeckStatistics: () => {
      const { isLoading, data, error } = useQuery(["mainDeckStatistics"], () =>
        fetch(`${path}/api/assets/statistics`, { method: "GET" }).then(
          (res) => {
            return res.json();
          }
        )
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsMontly: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsMontly"],
        () =>
          fetch(`${path}/api/vulnerabilities/statistic/monthly`, {
            method: "GET",
          }).then((res) => {
            return res.json();
          })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsOverall: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsOverall"],
        () =>
          fetch(`${path}/api/protected-sites/statistic/overall`, {
            method: "GET",
          }).then((res) => {
            return res.json();
          })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsRiskStatus: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsRiskStatus"],
        () =>
          fetch(
            `${path}/api/vulnerabilities/statistic/risk-status?generate_chart=true`,
            { method: "GET" }
          ).then((res) => {
            return res.json();
          })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsVulStatic: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsVulStatic"],
        () =>
          fetch(`${path}/api/vulnerabilities/statistic/daily?page=1&limit=15`, {
            method: "GET",
          }).then((res) => {
            return res.json();
          })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsDeadline: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsDeadline"],
        () =>
          fetch(`${path}/api/vulnerabilities/statistic/deadline`, {
            method: "GET",
          }).then((res) => {
            return res.json();
          })
      );
      return {
        isLoading,
        data,
        error,
      };
    },
    mainDeckStatisticsMaps: () => {
      const { isLoading, data, error } = useQuery(
        ["mainDeckStatisticsMaps"],
        () =>
          fetch(`${path}/api/assets/statistics/map`, { method: "GET" }).then(
            (res) => {
              return res.json();
            }
          )
      );
      return {
        isLoading,
        data,
        error,
      };
    },
  },

  root: (typeName) => {
    const { status } = GetAndUpdateContext();

    let data = typeName || [];

    if (typeName.length > 0) {
      let p = {
        data: {},
        loading: [],
        error: [],
        isFetching: [],
      };

      let parse = GET_API_EHA.data;

      data.map(async (d) => {
        let item;
        if (!d.query) {
          item = parse[d.active](status);

        } else {
          item = parse[d.active](status, d.query, d.pages);
        }

        if (item) {
         
          p["loading"].push(item?.isLoading);
          p["isFetching"].push(item?.isFetching);
          p["error"].push(item.error ? true : false);
          p["data"][d.active] = {
            ...item.data,
            refetch: item?.refetch,
            status: item.statusData,
          };
          if (item.props) {
            p["data"][d.active] = {
              ...item.data,
              props: item.props,
              refetch: item?.refetch,
            };
          }
          if (item.data?.code !== 200) {
            p["msg"] = item.data?.message;
          }


        }
        p[d.active] = parse[d.active];
      });



      return {
        ...p,
        error: checkStatement(p.error),
        loading: checkStatement(p.loading),
        isFetching: checkStatement(p.isFetching),
      };
    } else {
      return {
        error: true,
        msg: "ERROR DATA",
      };
    }
  },
};
